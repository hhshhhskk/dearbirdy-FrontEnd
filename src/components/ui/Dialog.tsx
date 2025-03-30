"use client";

import Modal from "./Modal";
import StyledButton from "./StyledButton";

interface DialogProps {
  title?: string;
  message?: string;
  onClose: () => void;
  className?: string;
  primaryButtonText: string;
  primaryButtonHandler: () => void;
  secondaryButtonText?: string;
  secondaryButtonHandler?: () => void;
}

export default function Dialog({
  title,
  message,
  onClose,
  className,
  primaryButtonText,
  primaryButtonHandler,
  secondaryButtonText,
  secondaryButtonHandler,
}: DialogProps) {
  return (
    <Modal onClose={onClose} className={className}>
      <div className="mb-global flex flex-col gap-2">
        {title && <h2 className="text-Body1_B_16">{title}</h2>}
        {message && <p className="text-Body1_R_16">{message}</p>}
      </div>

      <div className="flex justify-stretch gap-2">
        {secondaryButtonHandler && (
          <StyledButton
            onClick={secondaryButtonHandler}
            variant="outline-green"
          >
            {secondaryButtonText}
          </StyledButton>
        )}

        <StyledButton onClick={primaryButtonHandler}>
          {primaryButtonText}
        </StyledButton>
      </div>
    </Modal>
  );
}
