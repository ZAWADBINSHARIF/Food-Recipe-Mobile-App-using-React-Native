import { View, Text, ScrollView, Image, Platform, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AntDesign, Entypo } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

const RecipeDetails = () => {

    const params = useLocalSearchParams();
    const platform = Platform.OS;
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <ScrollView
            className='bg-white flex-1'
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: 30
            }}
        >


            <View
                className='flex-row justify-center'
            >

                <Animated.Image
                    source={{ uri: params?.strMealThumb as string }}
                    style={{
                        width: wp(98),
                        height: hp(50),
                        borderRadius: platform === 'ios' ? 53 : 35,

                        borderBottomLeftRadius: platform === 'ios' ? 40 : 35,
                        borderBottomRightRadius: platform === 'ios' ? 40 : 35,
                        marginTop: 4
                    }}
                    sharedTransitionTag={params?.idMeal as string}
                />

            </View>

            <View className=' w-full absolute flex-row justify-between items-center pt-14'>

                <TouchableOpacity className='p-1 rounded-full ml-5 bg-white'
                    onPress={() => router.back()}
                >
                    <Entypo name="chevron-left" size={hp(5.5)} color={'#fbbf25'} />
                </TouchableOpacity>

                <TouchableOpacity className='p-3 rounded-full mr-5 bg-white'
                    onPress={() => setIsFavorite(!isFavorite)}
                >
                    <AntDesign name="heart" size={hp(4)} color={isFavorite ? "red" : "gray"} />
                </TouchableOpacity>

            </View>



            <StatusBar style='light' />
        </ScrollView>
    );
};

export default RecipeDetails;