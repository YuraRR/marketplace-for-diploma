import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faMoneyBill } from "@fortawesome/free-solid-svg-icons";

const paymentOptions = [
  {
    value: "directBankTransfer",
    label: "Оплатити зараз карткою",
    icon: faCreditCard,
  },
  {
    value: "cashOnDelivery",
    label: "Оплата при отриманні товару",
    icon: faMoneyBill,
  },
];

export function PaymentSection({
  paymentMethod,
  setPaymentMethod,
}: {
  paymentMethod: "directBankTransfer" | "cashOnDelivery";
  setPaymentMethod: (value: "directBankTransfer" | "cashOnDelivery") => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <RadioGroup
        defaultValue="directBankTransfer"
        className="space-y-4"
        onValueChange={(value: "directBankTransfer" | "cashOnDelivery") => setPaymentMethod(value)}
        value={paymentMethod}
      >
        {paymentOptions.map((option) => (
          <div
            key={option.value}
            className="flex items-center space-x-3 transition-colors duration-200 hover:bg-gray-50"
          >
            <RadioGroupItem
              value={option.value}
              id={option.value}
              className="size-3 text-light-green ring-2 ring-light-green ring-offset-2 transition-transform duration-200 hover:scale-105 data-[state=checked]:border-light-green data-[state=checked]:bg-light-green "
            />
            <Label htmlFor={option.value} className="flex items-center gap-2 cursor-pointer">
              <span className="font-medium text-gray-800">{option.label}</span>
              <FontAwesomeIcon icon={option.icon} className="w-5 h-5 text-gray-600" />
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
