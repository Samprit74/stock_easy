import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
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
import { getMe, updateMe } from "@/services";
import { getErrorMessage, isApiError } from "@/services";
import type { UserResponse, UpdateProfileRequest } from "@/types";

const EMPTY_USER: UserResponse = {
  id: 0,
  username: "",
  role: "STAFF",
  firstName: null,
  lastName: null,
  phone: null,
  businessName: null,
  country: null,
  state: null,
  city: null,
  streetAddress: null,
  pinCode: null,
  gstNumber: null,
  aadhaarNumber: null,
  panCardNumber: null,
  drugLicenseNumber: null,
};

const ProfilePage = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<UserResponse>(EMPTY_USER);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getMe();
        if (!cancelled) setUser(data);
      } catch (e) {
        if (!cancelled) {
          toast({
            title: "Failed to load profile",
            description: getErrorMessage(e),
            variant: "destructive",
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [toast]);

  const set = (field: keyof UserResponse, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value || null }));
  };

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ") || user.username;

  const handleSave = async () => {
    const payload: UpdateProfileRequest = {
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      phone: user.phone ?? "",
      businessName: user.businessName ?? "",
      country: user.country ?? "",
      state: user.state ?? "",
      city: user.city ?? "",
      streetAddress: user.streetAddress ?? "",
      pinCode: user.pinCode ?? "",
      gstNumber: user.gstNumber ?? "",
      aadhaarNumber: user.aadhaarNumber ?? "",
      panCardNumber: user.panCardNumber ?? "",
      drugLicenseNumber: user.drugLicenseNumber ?? "",
    };
    setSaving(true);
    try {
      const updated = await updateMe(payload);
      setUser(updated);
      setIsEditing(false);
      toast({ title: "Profile updated", description: "Your details have been saved." });
    } catch (e) {
      const description = isApiError(e) && e.isValidation()
        ? Object.values(e.fieldErrors).join(", ")
        : getErrorMessage(e);
      toast({ title: "Save failed", description, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-orange-50">
        <Navigation />
        <div className="flex-grow flex justify-center items-center">
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <Navigation />

      <div className="flex-grow flex justify-center items-center py-10 px-4">
        <Card className="w-full max-w-5xl bg-white p-8 sm:p-10 rounded-2xl shadow-lg border border-orange-200">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={profile}
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
              <h1 className="text-3xl font-bold text-gray-900 mb-1">{fullName}</h1>
              <p className="text-gray-600 font-medium">
                {user.businessName || "StockEasy Pharmacy"}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Role: <span className="font-mono">{user.role}</span>
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 my-6" />

          <Section title="Personal Information" icon={User}>
            <Grid cols={3}>
              <Field
                label="First Name"
                value={user.firstName ?? ""}
                disabled={!isEditing}
                onChange={(v) => set("firstName", v)}
              />
              <Field
                label="Middle Name"
                value=""
                disabled
                onChange={() => {}}
                placeholder="(not stored)"
              />
              <Field
                label="Last Name"
                value={user.lastName ?? ""}
                disabled={!isEditing}
                onChange={(v) => set("lastName", v)}
              />
            </Grid>
          </Section>

          <Section title="Business Information" icon={Building2}>
            <Grid cols={3}>
              <Field label="Business Name" value={user.businessName ?? ""} disabled={!isEditing} onChange={(v) => set("businessName", v)} />
              <Field label="Country" value={user.country ?? ""} disabled={!isEditing} onChange={(v) => set("country", v)} />
              <Field label="State" value={user.state ?? ""} disabled={!isEditing} onChange={(v) => set("state", v)} />
              <Field label="City" value={user.city ?? ""} disabled={!isEditing} onChange={(v) => set("city", v)} />
              <Field label="Street" value={user.streetAddress ?? ""} disabled={!isEditing} onChange={(v) => set("streetAddress", v)} />
              <Field label="PIN Code" value={user.pinCode ?? ""} disabled={!isEditing} onChange={(v) => set("pinCode", v)} />
            </Grid>
          </Section>

          <Section title="Contact Information" icon={Phone}>
            <Grid cols={2}>
              <Field label="Phone" value={user.phone ?? ""} disabled={!isEditing} onChange={(v) => set("phone", v)} />
              <Field label="Username (read-only)" value={user.username} disabled onChange={() => {}} />
            </Grid>
          </Section>

          <Section title="Legal Documents" icon={FileText}>
            <Grid cols={2}>
              <Field label="GST Number" value={user.gstNumber ?? ""} disabled={!isEditing} onChange={(v) => set("gstNumber", v)} />
              <Field label="Drug License" value={user.drugLicenseNumber ?? ""} disabled={!isEditing} onChange={(v) => set("drugLicenseNumber", v)} />
              <Field label="Aadhaar" value={user.aadhaarNumber ?? ""} disabled={!isEditing} onChange={(v) => set("aadhaarNumber", v)} />
              <Field label="PAN" value={user.panCardNumber ?? ""} disabled={!isEditing} onChange={(v) => set("panCardNumber", v)} />
            </Grid>
          </Section>

          <Section title="Account" icon={Lock}>
            <p className="text-sm text-muted-foreground">
              User ID: <span className="font-mono">{user.id}</span>
            </p>
          </Section>

          <div className="flex justify-end gap-4 mt-10">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)} disabled={saving}>
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-green-600 text-white" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="bg-orange-500 text-black">
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

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Icon className="w-5 h-5 mr-2 text-orange-600" /> {title}
      </h2>
      {children}
    </section>
  );
}

function Grid({ cols, children }: { cols: 2 | 3; children: React.ReactNode }) {
  const cls = cols === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2";
  return <div className={`grid ${cls} gap-6`}>{children}</div>;
}

function Field({
  label,
  value,
  disabled,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  disabled: boolean;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm text-gray-600 mb-1 block">{label}</label>
      <Input
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

export default ProfilePage;
