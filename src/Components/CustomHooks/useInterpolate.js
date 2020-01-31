import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TweenLite, Power2 } from "gsap";

const useInterpolate = (
  fromVal,
  toVal,
  isForward = true,
  timeForward = 1,
  timeBackward = 0.2
) => {
  const [currentValue, setcurrentValue] = useState(fromVal);

  useEffect(() => {
    const currentData = {
      varVal: currentValue
    };

    const tween = TweenLite.to(
      currentData,
      isForward ? timeForward : timeBackward,
      {
        ease: Power2.easeInOut,
        varVal: isForward ? toVal : fromVal,
        onUpdate: () => {
          setcurrentValue(currentData.varVal);
        }
      }
    );

    return () => tween.kill();
  }, [fromVal, toVal, isForward, timeForward, timeBackward]);
  return currentValue;
};

useInterpolate.propTypes = {
  fromVal: PropTypes.any.isRequired,
  toVal: PropTypes.any.isRequired,
  isForward: PropTypes.bool,
  timeForward: PropTypes.number,
  timeBackward: PropTypes.number
};

export default useInterpolate;
