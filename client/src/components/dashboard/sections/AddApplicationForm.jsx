import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Card from "../../ui/Card";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

function AddApplicationForm({ onSubmit }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!company.trim() || !role.trim() || !location.trim()) {
      alert("Please fill all fields");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        company: company.trim(),
        role: role.trim(),
        location: location.trim(),
      });
      setCompany("");
      setRole("");
      setLocation("");
    } catch {
      alert("Failed to add application");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="mb-6 bg-zinc-950/40">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
          <FaPlus className="text-sm" />
        </span>
        Add New Application
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <Input
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <Input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Adding…" : "Add Application"}
        </Button>
      </form>
    </Card>
  );
}

export default AddApplicationForm;
