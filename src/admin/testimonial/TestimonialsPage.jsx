import { useState } from "react";
import { Plus, X } from "lucide-react";
import TestimonialList from "./TestimonialList";
import TestimonialForm from "./TestimonialForm";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

export default function TestimonialPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTestimonial(null);
  };

  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div className="min-h-screen px-4 sm:px-8 py-8" style={{ background: "#FAFAF7", fontFamily: "sans-serif", color: NAVY }}>
      
      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: GOLD }}>Admin Panel</p>
          <h1 className="text-2xl font-medium" style={{ fontFamily: "Georgia, serif" }}>Client Testimonials</h1>
          <p className="text-xs text-gray-400 mt-1">Manage feedback and ratings from your travelers</p>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-semibold uppercase tracking-widest border-none cursor-pointer"
          style={{ background: NAVY, letterSpacing: "0.08em" }}
        >
          <Plus size={15} /> Add Testimonial
        </button>
      </div>

      {/* ── List View ── */}
      <div className="max-w-7xl mx-auto">
        <TestimonialList
          refresh={refresh}
          onEdit={handleEdit}
          onRefresh={triggerRefresh}
        />
      </div>

      {/* ── Modal ── */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(27,43,75,0.45)" }}>
          <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden" style={{ border: "0.5px solid #e8e2d0" }}>
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "0.5px solid #ede8da", background: "#FAFAF7" }}>
              <div>
                <p className="text-[9px] uppercase tracking-widest font-semibold mb-0.5" style={{ color: GOLD }}>
                  {editingTestimonial ? "Updating" : "New Entry"}
                </p>
                <h3 className="text-base font-medium" style={{ fontFamily: "Georgia, serif" }}>
                  {editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}
                </h3>
              </div>
              <button onClick={handleCloseForm} className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F0EDE6] border-none cursor-pointer">
                <X size={15} style={{ color: NAVY }} />
              </button>
            </div>

            <div className="px-6 py-5">
              <TestimonialForm
                initialData={editingTestimonial}
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