import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import { categoryData } from '@/constants';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Categories = () => {
    return (
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className='space-x-4'
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >

                {
                    categoryData.map((category, index) =>
                        <TouchableOpacity
                            key={index}
                            className='flex items-center space-y-1'
                        >
                            <View className='rounded-full p-[6px]'>
                                <Image
                                    source={{ uri: category.image }}
                                    style={{
                                        width: hp(6),
                                        height: hp(6)
                                    }}
                                    className='rounded-full'
                                />
                            </View>

                            <Text className='text-neutral-600' style={{ fontSize: hp(1.6) }}>
                                {category.name}
                            </Text>

                        </TouchableOpacity>
                    )
                }

            </ScrollView>
        </View>
    );
};

export default Categories;