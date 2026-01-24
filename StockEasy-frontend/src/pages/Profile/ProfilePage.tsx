import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  Camera,
  User,
  Phone,
  Building2,
  FileText,
  Lock,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import profile from "@/assets/profile.png";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    firstName: "Suvodeep",
    middleName: "",
    lastName: "Guria",
    businessName: "StockEasy Pharmacy",
    country: "India",
    city: "Sodpur",
    state: "West Bengal",
    streetNumber: "15A",
    pinCode: "700110",
    email: "suvodeepguria@example.com",
    phoneNumber: "+91 9876543210",
    alternativePhone: "",
    gstNumber: "GST1234WB",
    aadhaarNumber: "1234-5678-9876",
    panCardNumber: "ABCDE1234F",
    certificateNumber: "CERT789456",
    joinDate: "2024-03-15",
    profileImage: profile,
  });

  const handleChange = (field: string, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your details have been successfully updated.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <Navigation />

      <div className="flex-grow flex justify-center items-center py-10 px-4">
        <Card className="w-full max-w-5xl bg-white p-8 sm:p-10 rounded-2xl shadow-lg border border-orange-200">

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-orange-300 shadow-md"
              />
              <button
                className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-md"
                onClick={() =>
                  toast({
                    title: "Coming Soon",
                    description: "Profile image upload will be available soon.",
                  })
                }
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                {user.firstName} {user.middleName} {user.lastName}
              </h1>
              <p className="text-gray-600 font-medium">{user.businessName}</p>
              <p className="text-gray-500 text-sm mt-1">
                Member since {new Date(user.joinDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 my-6" />

          {/* Personal Info */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-orange-600" /> Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["firstName", "middleName", "lastName"].map((key) => (
                <Input
                  key={key}
                  value={(user as any)[key]}
                  disabled={!isEditing}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              ))}
            </div>
          </section>

          {/* Business Info */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Building2 className="w-5 h-5 mr-2 text-orange-600" /> Business Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                "businessName",
                "country",
                "city",
                "state",
                "streetNumber",
                "pinCode",
              ].map((key) => (
                <Input
                  key={key}
                  value={(user as any)[key]}
                  disabled={!isEditing}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              ))}
            </div>
          </section>

          {/* Contact Info */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-orange-600" /> Contact Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["email", "phoneNumber", "alternativePhone"].map((key) => (
                <Input
                  key={key}
                  value={(user as any)[key]}
                  disabled={!isEditing}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              ))}
            </div>
          </section>

          {/* Legal */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-orange-600" /> Legal Documents
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "gstNumber",
                "aadhaarNumber",
                "panCardNumber",
                "certificateNumber",
              ].map((key) => (
                <Input
                  key={key}
                  value={(user as any)[key]}
                  disabled={!isEditing}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              ))}
            </div>
          </section>

          {/* Account */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Lock className="w-5 h-5 mr-2 text-orange-600" /> Account Information
            </h2>

            <Input value={user.joinDate} disabled />
          </section>

          {/* Actions */}
          <div className="flex justify-end gap-4 mt-10">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-green-600 text-white">
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-orange-500 text-black"
              >
                Edit Profile
              </Button>
            )}
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
