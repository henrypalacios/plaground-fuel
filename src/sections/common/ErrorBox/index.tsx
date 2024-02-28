import React, { useEffect, useRef, useState } from "react";
import styles from "./ErrorBox.module.scss";
import { FlexBox } from "../FlexBox";
import { classNames } from "@/utils/classNames";
import { InteractionError, isWarning } from "@/types/InteractionError";

interface ErrorBoxProps {
  error: InteractionError
  clearError?: () => void
}

const ErrorBox: React.FC<ErrorBoxProps> = ({error, clearError}) => {
  const [showError, setShowError] = useState(true);
  const {msg: errorMsg, onRetry, type} = error
  const errorRef = useRef(errorMsg);
  const boxStyle = isWarning(type) ? styles['box--warning'] :  styles['box--error']
  
  const _onRetry = () => {
      setShowError(false);
      clearError?.()
      onRetry?.()
  }

  useEffect(() => {
    if (errorMsg !== errorRef.current) {
      setShowError(true);
      errorRef.current = errorMsg;
    }
  }, [errorMsg]);

  if (!showError) return null;

  return (
    <div className={classNames(styles.box, boxStyle)}>
      <FlexBox direction="row" gap="sm" >
        <p className={styles.errorMessage}>{isWarning(type) ? '🚧 ': '🚨 '}{errorMsg}</p>
        {onRetry && (
          <button className={styles.retryButton} onClick={_onRetry}>
            Retry
          </button>
        )}
      </FlexBox>
    </div>
  );
};

export default ErrorBox;
