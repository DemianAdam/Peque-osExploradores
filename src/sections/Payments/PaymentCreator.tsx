import { PaymentForm } from "@/components/Forms/PaymentForm";
import { useNavigate } from "react-router";

export default function PaymentCreator() {
  const navigate = useNavigate();

  return (
    <div className="p-10 bg-[#C6E5D9] min-h-screen">
      <h1 className="text-3xl font-bold mb-5">Nuevo Pago</h1>

      <PaymentForm
        onSubmit={async (data) => {
          // Simulamos una demora de red antes de guardar y navegar
          await new Promise((resolve) => setTimeout(resolve, 500));
          
          console.log("Datos del pago a guardar:", data);
          
          navigate("/pagos");
        }}
      />
    </div>
  );
}