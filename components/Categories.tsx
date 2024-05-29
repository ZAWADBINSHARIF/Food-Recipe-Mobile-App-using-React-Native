import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import React from 'react';
// import { Image } from 'expo-image';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';



interface Props {
    activeCategory: string,
    categories: { idCategory: string, strCategory: string, strCategoryThumb: string, strCategoryDescription: string; }[];
    handleChangeCategory: (category: string) => void;
}


const Categories = ({ activeCategory, handleChangeCategory, categories }: Props) => {
    return (
        <Animated.View entering={FadeInDown.duration(500).springify()}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className='space-x-4'
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >

                {
                    categories.map((category, index) => {

                        const isActive = category.strCategory === activeCategory;
                        const activeButtomClass = isActive ? ' bg-amber-400' : ' bg-black/10';

                        return (<TouchableOpacity
                            key={index}
                            className='flex items-center space-y-1'
                            onPress={() => handleChangeCategory(category.strCategory)}
                        >
                            <View className={'rounded-full p-[6px]' + activeButtomClass}>
                                <Image
                                    source={{ uri: category.strCategoryThumb }}
                                    style={{
                                        width: hp(6),
                                        height: hp(6)
                                    }}
                                    className='rounded-full'
                                />
                            </View>

                            <Text className='text-neutral-600' style={{ fontSize: hp(1.6) }}>
                                {category.strCategory}
                            </Text>

                        </TouchableOpacity>);
                    }
                    )
                }

            </ScrollView>
        </Animated.View>
    );
};

export default Categories;