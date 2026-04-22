import { useState } from "react";
import { Plus, X } from "lucide-react";
import DestinationList from "./DestinationList";
import DestinationForm from "./DestinationForm";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

export default function DestinationPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDest, setEditingDest] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (dest) => {
    setEditingDest(dest);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingDest(null);
  };

  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div className="min-h-screen px-4 sm:px-8 py-8" style={{ background: "#FAFAF7", color: NAVY }}>
      
      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: GOLD }}>Inventory</p>
          <h1 className="text-2xl font-medium" style={{ fontFamily: "Georgia, serif" }}>Destinations</h1>
          <p className="text-xs text-gray-400 mt-1">Manage Himalayan travel locations</p>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-semibold uppercase tracking-widest border-none cursor-pointer hover:opacity-90 transition-opacity"
          style={{ background: NAVY, letterSpacing: "0.08em" }}
        >
          <Plus size={15} /> Add Destination
        </button>
      </div>

      {/* ── List Component ── */}
      <div className="max-w-7xl mx-auto">
        <DestinationList
          refresh={refresh}
          onEdit={handleEdit}
          onRefresh={triggerRefresh}
        />
      </div>

      {/* ── Modal ── */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(27,43,75,0.45)" }}>
          <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl" style={{ border: "0.5px solid #e8e2d0" }}>
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "0.5px solid #ede8da", background: "#FAFAF7" }}>
              <div>
                <p className="text-[9px] uppercase tracking-widest font-semibold mb-0.5" style={{ color: GOLD }}>
                  {editingDest ? "Updating" : "New Location"}
                </p>
                <h3 className="text-base font-medium" style={{ fontFamily: "Georgia, serif" }}>
                  {editingDest ? "Edit Destination" : "Create Destination"}
                </h3>
              </div>
              <button onClick={handleCloseForm} className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F0EDE6] border-none cursor-pointer">
                <X size={15} style={{ color: NAVY }} />
              </button>
            </div>

            <div className="px-6 py-5 overflow-y-auto" style={{ maxHeight: "80vh" }}>
              <DestinationForm
                initialData={editingDest}
                onSuccess={() => {
                  triggerRefresh();
                  handleCloseForm();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}