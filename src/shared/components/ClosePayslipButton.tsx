
import { ClosePayslipModal } from '@/features/payslips/components/ClosePayslipModal';
import { PayslipFeeModal } from '@/features/payslips/components/PayslipFeeModal';
import { Calculator } from 'lucide-react';
import { useState } from 'react'

export default function ClosePayslipButton() {

    const [isClosePayslipModalOpen, setIsClosePayslipModalOpen] = useState(false);
    const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);


    const onCloseClosePayslipModal = (closedPayslip: Boolean) => {
        //si EFECTIVAMENTE se cerro la liquidacion (no se cancelo), entonces abrimos el modal de definir cuota
        setIsClosePayslipModalOpen(false);
        if (closedPayslip) {
            setIsFeeModalOpen(true); 
        }

    }


    return (
        <>
            <div className="mb-8">
                <button
                    onClick={() => setIsClosePayslipModalOpen(true)}
                    className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                    <Calculator size={26} />
                    Liquidar Mes
                </button>
            </div>

            <ClosePayslipModal
                isOpen={isClosePayslipModalOpen}
                onClose={onCloseClosePayslipModal}

            />

            <PayslipFeeModal
                isOpen={isFeeModalOpen}
                onClose={() => setIsFeeModalOpen(false)}
            />

        </>

    )
}
