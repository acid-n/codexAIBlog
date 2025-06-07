import { Suspense } from "react";
import LoginFormWrapper from "../../components/login/LoginFormWrapper";

export default function LoginPage() {
  return (
    <div className="mt-10">
      <h1 className="mb-6 text-2xl font-bold text-center">Вход</h1>
      <Suspense fallback={<div>Загрузка...</div>}>
        <LoginFormWrapper />
      </Suspense>
    </div>
  );
}
