import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Error "mo:base/Error";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Types "./types";

actor CleanNinja {
    // Type imports from types.mo
    type WasteReport = Types.WasteReport;
    type WasteStatus = Types.WasteStatus;
    type UserProfile = Types.UserProfile;
    type Location = Types.Location;
    type ImageBlob = Types.ImageBlob;
    
    // State variables
    private stable var nextReportId : Nat = 1;
    private stable var wasteReportEntries : [(Nat, WasteReport)] = [];
    private stable var userProfileEntries : [(Principal, UserProfile)] = [];
    
    // In-memory state initialized from stable variables
    private var wasteReports = HashMap.fromIter<Nat, WasteReport>(wasteReportEntries.vals(), 10, Nat.equal, Hash.hash);
    private var userProfiles = HashMap.fromIter<Principal, UserProfile>(userProfileEntries.vals(), 10, Principal.equal, Principal.hash);
    
    // Pre-upgrade and post-upgrade hooks for data persistence
    system func preupgrade() {
        wasteReportEntries := Iter.toArray(wasteReports.entries());
        userProfileEntries := Iter.toArray(userProfiles.entries());
    };
    
    system func postupgrade() {
        wasteReportEntries := [];
        userProfileEntries := [];
    };
    
    // User Profile Management
    public shared(msg) func createProfile(name : Text) : async Bool {
        let caller = msg.caller;
        
        if (Principal.isAnonymous(caller)) {
            throw Error.reject("Anonymous principal not allowed");
        };
        
        // Create new profile or update existing
        let profile : UserProfile = {
            principal = caller;
            name = name;
            reportCount = 0;
            cleanedCount = 0;
            createdAt = Time.now();
        };
        
        userProfiles.put(caller, profile);
        return true;
    };
    
    public shared query(msg) func getProfile() : async ?UserProfile {
        let caller = msg.caller;
        if (Principal.isAnonymous(caller)) {
            return null;
        };
        
        return userProfiles.get(caller);
    };
    
    public shared query func getProfileByPrincipal(principal : Principal) : async ?UserProfile {
        return userProfiles.get(principal);
    };
    
    // Waste Report Management
    public shared(msg) func createWasteReport(
        description : Text,
        location : Location,
        imageBefore : ImageBlob
    ) : async ?Nat {
        let caller = msg.caller;
        
        if (Principal.isAnonymous(caller)) {
            throw Error.reject("Must be authenticated to report waste");
        };
        
        // Increment report count for user
        switch (userProfiles.get(caller)) {
            case (null) {
                // Create profile if it doesn't exist
                let profile : UserProfile = {
                    principal = caller;
                    name = "User"; // Default name
                    reportCount = 1;
                    cleanedCount = 0;
                    createdAt = Time.now();
                };
                userProfiles.put(caller, profile);
            };
            case (?profile) {
                let updatedProfile : UserProfile = {
                    principal = profile.principal;
                    name = profile.name;
                    reportCount = profile.reportCount + 1;
                    cleanedCount = profile.cleanedCount;
                    createdAt = profile.createdAt;
                };
                userProfiles.put(caller, updatedProfile);
            };
        };
        
        // Create waste report
        let report : WasteReport = {
            id = nextReportId;
            reporter = caller;
            description = description;
            location = location;
            status = #reported;
            imageBefore = imageBefore;
            imageAfter = null;
            reportedAt = Time.now();
            cleanedAt = null;
            cleanedBy = null;
        };
        
        wasteReports.put(nextReportId, report);
        let reportId = nextReportId;
        nextReportId += 1;
        
        return ?reportId;
    };
    
    public shared(msg) func updateWasteStatus(
        reportId : Nat,
        newStatus : WasteStatus,
        imageAfter : ?ImageBlob
    ) : async Bool {
        let caller = msg.caller;
        
        if (Principal.isAnonymous(caller)) {
            throw Error.reject("Must be authenticated to update waste status");
        };
        
        switch (wasteReports.get(reportId)) {
            case (null) { return false; };
            case (?report) {
                // Only allow status to change to cleaned if not already cleaned
                if (newStatus == #cleaned and report.status == #reported) {
                    // Update user profile cleaned count
                    switch (userProfiles.get(caller)) {
                        case (null) {
                            // Create profile if doesn't exist
                            let profile : UserProfile = {
                                principal = caller;
                                name = "User"; // Default name
                                reportCount = 0;
                                cleanedCount = 1;
                                createdAt = Time.now();
                            };
                            userProfiles.put(caller, profile);
                        };
                        case (?profile) {
                            let updatedProfile : UserProfile = {
                                principal = profile.principal;
                                name = profile.name;
                                reportCount = profile.reportCount;
                                cleanedCount = profile.cleanedCount + 1;
                                createdAt = profile.createdAt;
                            };
                            userProfiles.put(caller, updatedProfile);
                        };
                    };
                    
                    // Update waste report
                    let updatedReport : WasteReport = {
                        id = report.id;
                        reporter = report.reporter;
                        description = report.description;
                        location = report.location;
                        status = newStatus;
                        imageBefore = report.imageBefore;
                        imageAfter = imageAfter;
                        reportedAt = report.reportedAt;
                        cleanedAt = ?Time.now();
                        cleanedBy = ?caller;
                    };
                    
                    wasteReports.put(reportId, updatedReport);
                    return true;
                } else {
                    return false;
                };
            };
        };
    };
    
    public query func getWasteReport(reportId : Nat) : async ?WasteReport {
        return wasteReports.get(reportId);
    };
    
    public query func getAllWasteReports() : async [WasteReport] {
        return Iter.toArray(wasteReports.vals());
    };
    
    public query func getUserWasteReports(userPrincipal : Principal) : async [WasteReport] {
        let buffer = Buffer.Buffer<WasteReport>(0);
        
        for (report in wasteReports.vals()) {
            if (Principal.equal(report.reporter, userPrincipal)) {
                buffer.add(report);
            };
        };
        
        return Buffer.toArray(buffer);
    };
    
    public query func getUserCleanedReports(userPrincipal : Principal) : async [WasteReport] {
        let buffer = Buffer.Buffer<WasteReport>(0);
        
        for (report in wasteReports.vals()) {
            switch (report.cleanedBy) {
                case (null) {};
                case (?cleaner) {
                    if (Principal.equal(cleaner, userPrincipal)) {
                        buffer.add(report);
                    };
                };
            };
        };
        
        return Buffer.toArray(buffer);
    };
    
    public query func getNearbyWasteReports(
        lat : Float,
        lng : Float,
        radiusKm : Float
    ) : async [WasteReport] {
        // This is a simplified implementation that doesn't actually calculate
        // distance. In a real application, you would implement the haversine formula.
        // For now, we just return all reports for demonstration purposes.
        return Iter.toArray(wasteReports.vals());
    };
    
    // For development and testing
    public shared(msg) func clearAllData() : async Bool {
        // Only allow this in development environments
        // In production, you would check if caller has admin rights
        let caller = msg.caller;
        
        if (Principal.isAnonymous(caller)) {
            return false;
        };
        
        wasteReports := HashMap.HashMap<Nat, WasteReport>(10, Nat.equal, Hash.hash);
        userProfiles := HashMap.HashMap<Principal, UserProfile>(10, Principal.equal, Principal.hash);
        nextReportId := 1;
        
        return true;
    };
}
