import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

function EditApplicationModal({ application, onChange, onClose, onSave }) {
  return (
    <Modal
      open={Boolean(application)}
      onClose={onClose}
      title="Edit Application"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save changes</Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input
          value={application?.company ?? ""}
          onChange={(e) =>
            onChange({ ...application, company: e.target.value })
          }
          placeholder="Company"
        />
        <Input
          value={application?.role ?? ""}
          onChange={(e) => onChange({ ...application, role: e.target.value })}
          placeholder="Role"
        />
        <Input
          value={application?.location ?? ""}
          onChange={(e) =>
            onChange({ ...application, location: e.target.value })
          }
          placeholder="Location"
        />
      </div>
    </Modal>
  );
}

export default EditApplicationModal;
