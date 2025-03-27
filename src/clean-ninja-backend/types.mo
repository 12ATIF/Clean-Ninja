import Principal "mo:base/Principal";
import Time "mo:base/Time";

module {
    // Base data types
    public type Location = {
        latitude: Float;
        longitude: Float;
        address: ?Text;
    };

    public type ImageBlob = [Nat8];

    public type WasteStatus = {
        #reported;
        #cleaned;
    };

    // Core entity types
    public type WasteReport = {
        id: Nat;
        reporter: Principal;
        description: Text;
        location: Location;
        status: WasteStatus;
        imageBefore: ImageBlob;
        imageAfter: ?ImageBlob;
        reportedAt: Time.Time;
        cleanedAt: ?Time.Time;
        cleanedBy: ?Principal;
    };

    public type UserProfile = {
        principal: Principal;
        name: Text;
        reportCount: Nat;
        cleanedCount: Nat;
        createdAt: Time.Time;
    };
}
