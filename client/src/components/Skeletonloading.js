import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default function SkeletonLoading({}) {
  return Array.from({ length: 3 }).map((_, index) => (
    <View key={index} style={{ marginBottom: 12 }}>
      <SkeletonPlaceholder speed={900}>
      <SkeletonPlaceholder.Item width="100%" height={20} borderRadius={6} />
          <SkeletonPlaceholder.Item
            height={0}
            marginBottom={12}
            />
        <SkeletonPlaceholder.Item flexDirection="row">
          <SkeletonPlaceholder.Item width={80} height={80} borderRadius={6} />
          <SkeletonPlaceholder.Item
            flex={1}
            height={50}
            justifyContent={"space-between"}
            marginLeft={12}
          >
            <SkeletonPlaceholder.Item
              width="30%"
              height={20}
              borderRadius={6}
            />

            <SkeletonPlaceholder.Item
              width="80%"
              height={20}
              borderRadius={6}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  ));
}
