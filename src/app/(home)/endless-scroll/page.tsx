import EndlessScroll from "@/components/pages/endlessScroll";
import PageCtrl from "@/components/ui/pageCtrl";

export default function page() {
  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-evenly">
        <PageCtrl />
        <EndlessScroll />
      </div>
    </div>
  );
}
