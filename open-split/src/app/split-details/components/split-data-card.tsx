import { FilledButton } from '@/components/ui/common/filled-button'
import { OutlinedButton } from '@/components/ui/common/outlined-button'
import { Check, ArrowRight } from 'lucide-react'

interface SplitDataCardProps {
  name: string;
  status: string;
  amount: number;
  paid: boolean;
}

export default function SplitDataCard({ name, status, amount, paid }: SplitDataCardProps) {
  return (
    <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs">
      <div className="flex justify-between items-center mb-3">
        <h5 className="text-2xl font-semibold tracking-tight text-heading leading-8">{name}</h5>
        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
          paid 
            ? 'bg-green-400/10 text-green-400 inset-ring inset-ring-green-500/20' 
            : 'bg-gray-400/10 text-gray-400 inset-ring inset-ring-gray-400/20'
        }`}>
          {status}
        </span>
      </div>
      <p className="text-body mb-6">
        Pay {amount.toFixed(2)}
      </p>
      <div className="flex gap-2">
        <FilledButton
          size="small"
          startIcon={<Check size={16} />}
          disabled={paid}
        >
          {paid ? 'Paid' : 'Mark as Paid'}
        </FilledButton>
        <OutlinedButton
          size="small"
          endIcon={<ArrowRight size={16} />}
        >
          View Bank Details
        </OutlinedButton>
      </div>
    </div>
  );
}
