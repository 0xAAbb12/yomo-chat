"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";

interface AnimationState {
  currentAnimation: number;
  isAnimating: boolean;
}

// 定义位置配置接口
interface PositionConfig {
  id?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  lgTop?: string;
  lgLeft?: string;
  lgRight?: string;
  lgBottom?: string;
  transform?: string;
}

// 定义尺寸配置接口
interface SizeConfig {
  width?: number;
  height?: number;
  lgWidth?: number;
  lgHeight?: number;
}

export default function AnimatedIllustration() {
  const [animationState, setAnimationState] = useState<AnimationState>({
    currentAnimation: 1,
    isAnimating: false,
  });

  // 判断是否是移动端
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  // 动画配置
  const animations = [
    {
      id: 1,
      describe: "/images/describe_1.png",
      emojiL: "/images/emoji_l_1.png",
      emojiR: "/images/emoji_r_1.png",
      emojiB: null,
      describePosition: {
        top: "26%",
        left: "-3%",
        lgTop: "30%",
        lgLeft: "-4%",
      }, // 小猫左侧
      describeSize: {
        width: 110,
        height: 82,
        lgWidth: 146.848,
        lgHeight: 109.373,
      }, // 移动端缩小到75%
      emojiLPosition: { top: "56%", left: "8%", lgTop: "60%", lgLeft: "6%" },
      emojiRPosition: { top: "36%", right: "11%", lgTop: "20%", lgRight: "8%" },
      emojiLSize: { width: 38, height: 38, lgWidth: 50, lgHeight: 50 }, // 移动端缩小到75%
      emojiRSize: { width: 38, height: 38, lgWidth: 50, lgHeight: 50 }, // 移动端缩小到75%
      emojiBSize: null,
    },
    {
      id: 2,
      describe: "/images/describe_2.png",
      emojiL: "/images/emoji_l_2.png",
      emojiR: "/images/emoji_r_2.png",
      emojiB: null,
      describePosition: {
        top: "17%",
        right: "-3%",
        lgTop: "22%",
        lgRight: "-5%",
      }, // 小猫右侧
      describeSize: { width: 160, height: 42, lgWidth: 230, lgHeight: 56.556 }, // 移动端缩小到75%
      emojiLPosition: { top: "30%", left: "8%", lgTop: "20%", lgLeft: "10%" },
      emojiRPosition: { top: "55%", right: "10%", lgTop: "58%", lgRight: "6%" },
      emojiLSize: { width: 60, height: 60, lgWidth: 80, lgHeight: 80 }, // 移动端缩小到75%
      emojiRSize: { width: 38, height: 38, lgWidth: 50, lgHeight: 50 }, // 移动端缩小到75%
      emojiBSize: null,
    },
    {
      id: 3,
      describe: "/images/describe_3.png",
      emojiL: "/images/emoji_l_3.png",
      emojiR: "/images/emoji_r_3.png",
      emojiB: "/images/emoji_b_3.png",
      describePosition: {
        top: "5%",
        left: "0%",
        lgTop: "12%",
        lgLeft: "5%",
        transform: "translateX(-50%)",
      }, // 小猫上面，居中
      describeSize: { width: 190, height: 50, lgWidth: 300, lgHeight: 70 }, // 移动端缩小到75%
      emojiLPosition: { top: "35%", left: "6%", lgTop: "40%", lgLeft: "2%" },
      emojiRPosition: { top: "30%", right: "10%", lgTop: "35%", lgRight: "5%" },
      emojiLSize: { width: 53, height: 53, lgWidth: 70, lgHeight: 70 }, // 移动端缩小到75%
      emojiRSize: { width: 45, height: 45, lgWidth: 60, lgHeight: 60 }, // 移动端缩小到75%
      emojiBSize: { width: 30, height: 30, lgWidth: 40, lgHeight: 40 }, // 移动端缩小到75%
      emojiBPosition: {
        bottom: "8%",
        right: "30%",
        lgBottom: "-2%",
        lgRight: "30%",
      },
    },
  ];

  // 固定元素
  const fixedElements = {
    background: "/images/yomo_bg.png",
    circleIcon: "/images/circle_icon.png",
    closeIcon: "/images/close_icon.png",
    dojiIcon: "/images/doji_icon.png",
  };

  useEffect(() => {
    // 页面加载后立即开始第一个动画
    setAnimationState({ currentAnimation: 1, isAnimating: true });

    const animationDuration = 5000; // 每个动画持续5秒
    const interval = setInterval(() => {
      setAnimationState((prev) => ({
        currentAnimation:
          prev.currentAnimation === 3 ? 1 : prev.currentAnimation + 1,
        isAnimating: true,
      }));
    }, animationDuration);

    return () => clearInterval(interval);
  }, []);

  const currentAnim = animations.find(
    (anim) => anim.id === animationState.currentAnimation
  );

  // 根据位置配置获取样式 - 根据设备类型选择配置
  const getPositionStyle = (position: PositionConfig) => {
    const style: React.CSSProperties = {};

    if (isMobile) {
      // 移动端配置
      if (position.top) style.top = position.top;
      if (position.left) style.left = position.left;
      if (position.right) style.right = position.right;
      if (position.bottom) style.bottom = position.bottom;
      if (position.transform) style.transform = position.transform;
    } else {
      // 桌面端配置
      if (position.lgTop) style.top = position.lgTop;
      if (position.lgLeft) style.left = position.lgLeft;
      if (position.lgRight) style.right = position.lgRight;
      if (position.lgBottom) style.bottom = position.lgBottom;
      if (position.transform) style.transform = position.transform;
    }

    return style;
  };

  // 获取尺寸样式 - 根据设备类型选择尺寸
  const getSizeStyle = (size: SizeConfig) => {
    if (isMobile) {
      return {
        width: size.width || size.lgWidth,
        height: size.height || size.lgHeight,
        maxWidth: `${size.width || size.lgWidth}px`,
        maxHeight: `${size.height || size.lgHeight}px`,
      };
    } else {
      return {
        width: size.lgWidth || size.width,
        height: size.lgHeight || size.height,
        maxWidth: `${size.lgWidth || size.width}px`,
        maxHeight: `${size.lgHeight || size.height}px`,
      };
    }
  };

  // 获取描述文字的变换原点
  const getDescribeTransformOrigin = (position: PositionConfig) => {
    if (isMobile) {
      if (position.left && position.left !== "50%") {
        return "right center"; // 左侧定位，从左侧中心缩放
      } else if (position.right) {
        return "left center"; // 右侧定位，从右侧中心缩放
      } else {
        return "center"; // 居中定位，从中心缩放
      }
    } else {
      if (position.lgLeft && position.lgLeft !== "50%") {
        return "right center"; // 左侧定位，从左侧中心缩放
      } else if (position.lgRight) {
        return "left center"; // 右侧定位，从右侧中心缩放
      } else if (position.id === 3) {
        return "center"; // 居中定位，从中心缩放
      } else {
        return "center"; // 居中定位，从中心缩放
      }
    }
  };

  // 描述文字动画变体 - 保持原来的缩放效果
  const describeVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  };

  // emoji动画变体 - 从中心向外飞出
  const emojiVariants: Variants = {
    hidden: {
      scale: 0,
      opacity: 0,
      x: 0,
      y: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.3,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      x: -100,
      y: -50,
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
  };

  // 右侧emoji动画变体 - 从中心向外飞出
  const emojiRightVariants: Variants = {
    hidden: {
      scale: 0,
      opacity: 0,
      x: 0,
      y: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.5,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      x: 100,
      y: -50,
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
  };

  // 底部emoji动画变体 - 从中心向外飞出
  const emojiBottomVariants: Variants = {
    hidden: {
      scale: 0,
      opacity: 0,
      y: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.7,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      y: 100,
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="relative w-full h-full max-w-[520px] mx-auto">
      {/* 背景图 - 移动端缩小 */}
      <Image
        src={fixedElements.background}
        alt="Yomo Background"
        width={400}
        height={400}
        className="w-full h-full object-contain scale-78 lg:scale-100"
        priority
      />

      {/* 固定图标 - 移动端缩小 */}
      <Image
        src={fixedElements.circleIcon}
        alt="Circle Icon"
        width={20}
        height={20}
        className="absolute bottom-10 left-10 lg:bottom-10 lg:left-10 w-4 h-4 lg:w-5 lg:h-5"
      />
      <Image
        src={fixedElements.closeIcon}
        alt="Close Icon"
        width={20}
        height={20}
        className="absolute bottom-16 right-14 lg:bottom-15 lg:right-17 w-4 h-4 lg:w-5 lg:h-5"
      />
      <Image
        src={fixedElements.dojiIcon}
        alt="Doji Icon"
        width={20}
        height={20}
        className="absolute top-15 right-15 lg:top-8 lg:right-24 w-5 lg:w-6 "
      />

      {/* 动态动画元素 */}
      <AnimatePresence mode="wait">
        {currentAnim && animationState.isAnimating && (
          <motion.div key={currentAnim.id}>
            {/* 描述文字 - 固定位置从小变大 */}
            <motion.div
              className="absolute"
              style={{
                ...getPositionStyle(currentAnim.describePosition),
                transformOrigin: getDescribeTransformOrigin(
                  currentAnim.describePosition
                ),
              }}
              variants={describeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Image
                src={currentAnim.describe}
                alt="Description"
                width={
                  isMobile
                    ? currentAnim.describeSize.width ||
                      currentAnim.describeSize.lgWidth
                    : currentAnim.describeSize.lgWidth ||
                      currentAnim.describeSize.width
                }
                height={
                  isMobile
                    ? currentAnim.describeSize.height ||
                      currentAnim.describeSize.lgHeight
                    : currentAnim.describeSize.lgHeight ||
                      currentAnim.describeSize.height
                }
                className="w-auto h-auto"
                style={getSizeStyle(currentAnim.describeSize)}
              />
            </motion.div>

            {/* 左侧表情 */}
            <motion.div
              className="absolute"
              style={getPositionStyle(currentAnim.emojiLPosition)}
              variants={emojiVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Image
                src={currentAnim.emojiL}
                alt="Left Emoji"
                width={
                  isMobile
                    ? currentAnim.emojiLSize.width ||
                      currentAnim.emojiLSize.lgWidth
                    : currentAnim.emojiLSize.lgWidth ||
                      currentAnim.emojiLSize.width
                }
                height={
                  isMobile
                    ? currentAnim.emojiLSize.height ||
                      currentAnim.emojiLSize.lgHeight
                    : currentAnim.emojiLSize.lgHeight ||
                      currentAnim.emojiLSize.height
                }
                className="w-auto h-auto"
                style={getSizeStyle(currentAnim.emojiLSize)}
              />
            </motion.div>

            {/* 右侧表情 */}
            <motion.div
              className="absolute"
              style={getPositionStyle(currentAnim.emojiRPosition)}
              variants={emojiRightVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Image
                src={currentAnim.emojiR}
                alt="Right Emoji"
                width={
                  isMobile
                    ? currentAnim.emojiRSize.width ||
                      currentAnim.emojiRSize.lgWidth
                    : currentAnim.emojiRSize.lgWidth ||
                      currentAnim.emojiRSize.width
                }
                height={
                  isMobile
                    ? currentAnim.emojiRSize.height ||
                      currentAnim.emojiRSize.lgHeight
                    : currentAnim.emojiRSize.lgHeight ||
                      currentAnim.emojiRSize.height
                }
                className="w-auto h-auto"
                style={getSizeStyle(currentAnim.emojiRSize)}
              />
            </motion.div>

            {/* 底部表情 - 仅第三个动画显示 */}
            {currentAnim.emojiB && currentAnim.emojiBSize && (
              <motion.div
                className="absolute"
                style={getPositionStyle(currentAnim.emojiBPosition)}
                variants={emojiBottomVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Image
                  src={currentAnim.emojiB}
                  alt="Bottom Emoji"
                  width={
                    isMobile
                      ? currentAnim.emojiBSize.width ||
                        currentAnim.emojiBSize.lgWidth
                      : currentAnim.emojiBSize.lgWidth ||
                        currentAnim.emojiBSize.width
                  }
                  height={
                    isMobile
                      ? currentAnim.emojiBSize.height ||
                        currentAnim.emojiBSize.lgHeight
                      : currentAnim.emojiBSize.lgHeight ||
                        currentAnim.emojiBSize.height
                  }
                  className="w-auto h-auto"
                  style={getSizeStyle(currentAnim.emojiBSize)}
                />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
