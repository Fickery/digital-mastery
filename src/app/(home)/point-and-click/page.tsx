import PointAndClickGame from "@/components/pages/pointAndClick";
import PageCtrl from "@/components/ui/pageCtrl";

export default function page() {
  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-evenly">
        <PageCtrl />
        <PointAndClickGame />
      </div>
    </div>
  );
}
