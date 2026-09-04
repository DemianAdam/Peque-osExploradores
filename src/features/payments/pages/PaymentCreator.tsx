import { PaymentForm } from "@shared/forms/PaymentForm";
import { useNavigate, useSearchParams } from "react-router";

export default function PaymentCreator() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const urlFeeId = searchParams.get("feeId");

    return (
        <div className="p-10 bg-[#C6E5D9] min-h-screen">
            <h1 className="text-3xl font-bold mb-5">Nuevo Pago</h1>
            <PaymentForm
                initialFeeId={urlFeeId || undefined}
                onSuccess={() => navigate("/pagos")}
            />
        </div>
    );
}