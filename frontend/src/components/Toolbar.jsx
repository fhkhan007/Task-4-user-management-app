import { Button } from "react-bootstrap";

export default function Toolbar({
  selectedCount,
  onBlock,
  onUnblock,
  onDelete,
}) {
  return (
    <div className="d-flex gap-2 mb-3">
      <Button variant="danger" onClick={onBlock} disabled={selectedCount === 0}>
        Block
      </Button>
      <Button
        variant="success"
        onClick={onUnblock}
        disabled={selectedCount === 0}
      >
        Unblock {/* Removed FaUnlock icon */}
      </Button>
      <Button
        variant="outline-danger"
        onClick={onDelete}
        disabled={selectedCount === 0}
      >
        Delete {/* Removed FaTrash icon */}
      </Button>
    </div>
  );
}
