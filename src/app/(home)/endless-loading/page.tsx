import EndlessLoading from "@/components/pages/endlessLoading";
import PageCtrl from "@/components/ui/pageCtrl";

export default function page() {
  return (
    <div className="h-screen">
      <div className="flex h-full flex-col items-center justify-evenly">
        <PageCtrl />
        <EndlessLoading />
      </div>
    </div>
  );
}
