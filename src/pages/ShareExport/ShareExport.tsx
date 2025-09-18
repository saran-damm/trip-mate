import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Icon from "../../components/common/IconProvider";

export default function ShareExport() {
  return (
    <div className="min-h-screen bg-light px-6 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6 flex items-center">
        Share & Export <Icon icon={"share" as const} className="ml-2 text-primary" />
      </h1>

      {/* Share Options */}
      <Card>
        <h2 className="text-xl font-semibold mb-3">Share Trip</h2>
        <p className="text-neutral mb-4">
          Generate a link to share your itinerary with friends and family.
        </p>
        <Button
          label={<>
            Generate Share Link <Icon icon={"link" as const} className="ml-1" />
          </>}
          onClick={() => alert("Share link generated")}
        />
      </Card>

      {/* Export Options */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <Card>
          <h2 className="text-xl font-semibold mb-3">Download PDF</h2>
          <p className="text-neutral mb-4">
            Export your trip itinerary as a PDF document.
          </p>
          <Button
            label={<>
              Download PDF <Icon icon={"file-pdf" as const} className="ml-1" />
            </>}
            onClick={() => alert("PDF downloaded")}
          />
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-3">Export to Calendar</h2>
          <p className="text-neutral mb-4">
            Add your itinerary to Google Calendar or iCal.
          </p>
          <Button
            label={<>
              Export to Calendar <Icon icon={"calendar" as const} className="ml-1" />
            </>}
            onClick={() => alert("ICS calendar file exported")}
          />
        </Card>
      </div>
    </div>
  );
}
