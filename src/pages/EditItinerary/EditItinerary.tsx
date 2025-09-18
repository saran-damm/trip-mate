import { useState } from "react";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

export default function EditItinerary() {
  const [openExtend, setOpenExtend] = useState(false);
  const [openCustom, setOpenCustom] = useState(false);
  const [days, setDays] = useState(1);
  const [customPlace, setCustomPlace] = useState("");

  return (
    <div className="min-h-screen bg-light px-6 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Edit Your Itinerary ✏️</h1>

      {/* Options */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-3">Extend Trip</h2>
          <p className="text-neutral mb-4">
            Add extra days and see nearby suggestions.
          </p>
          <Button label="Extend Trip" onClick={() => setOpenExtend(true)} />
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-3">Add Custom Place</h2>
          <p className="text-neutral mb-4">
            Add a specific attraction and check feasibility.
          </p>
          <Button label="Add Place" onClick={() => setOpenCustom(true)} />
        </Card>
      </div>

      {/* Extend Trip Modal */}
      <Modal open={openExtend} onClose={() => setOpenExtend(false)}>
        <h2 className="text-xl font-bold mb-4">Extend Your Trip</h2>
        <label className="block mb-2 font-medium">Extra Days</label>
        <input
          type="number"
          min="1"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="border rounded-lg px-3 py-2 w-24 mb-4"
        />
        <div className="bg-light p-3 rounded-lg mb-4">
          <p className="text-sm text-neutral">
            Suggestions for +{days} day(s): Pushkar, Ajmer, Ranthambore
          </p>
          <p className="text-sm text-primary font-semibold">
            Added Cost: ₹{days * 4000} approx
          </p>
        </div>
        <Button
          label="Confirm Extension"
          onClick={() => {
            alert(`Trip extended by ${days} day(s)!`);
            setOpenExtend(false);
          }}
        />
      </Modal>

      {/* Add Custom Place Modal */}
      <Modal open={openCustom} onClose={() => setOpenCustom(false)}>
        <h2 className="text-xl font-bold mb-4">Add Custom Place</h2>
        <input
          type="text"
          placeholder="Enter place name"
          value={customPlace}
          onChange={(e) => setCustomPlace(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full mb-4"
        />
        {customPlace && (
          <div className="bg-light p-3 rounded-lg mb-4">
            <p className="text-sm text-neutral">
              {customPlace} is 2h drive from Jaipur.
            </p>
            <p className="text-sm text-primary font-semibold">
              Added Cost: ₹2,000 approx
            </p>
          </div>
        )}
        <Button
          label="Add Place"
          onClick={() => {
            alert(`${customPlace} added to itinerary!`);
            setOpenCustom(false);
          }}
        />
      </Modal>
    </div>
  );
}
