import CaptchaChallenge from "@/components/pages/captchaRepeat";
import PageCtrl from "@/components/ui/pageCtrl";

export default function page() {
  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-evenly">
        <PageCtrl />
        <CaptchaChallenge />
      </div>
    </div>
  );
}
