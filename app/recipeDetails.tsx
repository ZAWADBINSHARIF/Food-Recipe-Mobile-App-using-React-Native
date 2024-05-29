import { View, Text, ScrollView, Image, Platform, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AntDesign, Entypo, Feather, FontAwesome, FontAwesome6, Octicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import Loading from '@/components/Loading';


interface MealDetails {
    idMeal: string;
    strMeal: string;
    strDrinkAlternate: string | null;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string;
    strYoutube?: string;
    strIngredient1?: string;
    strIngredient2?: string;
    strIngredient3?: string;
    strIngredient4?: string;
    strIngredient5?: string;
    strIngredient6?: string;
    strIngredient7?: string;
    strIngredient8?: string;
    strIngredient9?: string;
    strIngredient10?: string;
    strIngredient11?: string;
    strIngredient12?: string;
    strIngredient13?: string;
    strIngredient14?: string;
    strIngredient15?: string;
    strIngredient16?: string;
    strIngredient17?: string;
    strIngredient18?: string;
    strIngredient19?: string;
    strIngredient20?: string;
    strMeasure1?: string;
    strMeasure2?: string;
    strMeasure3?: string;
    strMeasure4?: string;
    strMeasure5?: string;
    strMeasure6?: string;
    strMeasure7?: string;
    strMeasure8?: string;
    strMeasure9?: string;
    strMeasure10?: string;
    strMeasure11?: string;
    strMeasure12?: string;
    strMeasure13?: string;
    strMeasure14?: string;
    strMeasure15?: string;
    strMeasure16?: string;
    strMeasure17?: string;
    strMeasure18?: string;
    strMeasure19?: string;
    strMeasure20?: string;
}

const RecipeDetails = () => {

    const params = useLocalSearchParams();
    const platform = Platform.OS;
    const [isFavorite, setIsFavorite] = useState(false);
    const [mealDetails, setMealDetails] = useState<MealDetails | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const fetchMealDetail = async (id: string) => {
        try {

            setIsLoading(true);

            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

            if (response && response.data) {
                setMealDetails(response.data.meals[0]);
            }

        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };


    const ingredientIndex = (mealDetails: MealDetails) => {
        if (!mealDetails) return [];

        let data = [];

        for (let i = 1; i <= 20; i++) {
            const value = (mealDetails as any)['strIngredient' + i];
            if (value) {
                data.push(i);
            }
        }

        return data;
    };


    const getYouTubeVideoId = (url: string) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : '';
    };

    useEffect(() => {
        fetchMealDetail(params?.idMeal as string);
    }, []);

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

            <Animated.View entering={FadeIn.delay(200).duration(1000)} className=' w-full absolute flex-row justify-between items-center pt-14'>

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

            </Animated.View>

            {
                isLoading ? <Loading size={'large'} className='mt-14' color='black' /> :

                    <View className=' px-4 flex justify-between space-y-4 pt-8'>

                        <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className='space-y-2'>
                            <Text style={{ fontSize: hp(3) }} className='font-bold flex-1 text-neutral-700'>
                                {mealDetails?.strMeal}
                            </Text>
                            <Text style={{ fontSize: hp(2) }} className='font-medium flex-1 text-neutral-500'>
                                {mealDetails?.strArea}
                            </Text>
                        </Animated.View>


                        <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className='flex-row justify-around'>

                            <View className='flex rounded-full bg-amber-300 p-2'>
                                <View
                                    style={{ width: hp(6.5), height: hp(6.5) }}
                                    className='bg-white rounded-full flex items-center justify-center'>
                                    <Feather name="clock" size={hp(5)} color="gray" />
                                </View>

                                <View className='flex items-center py-2 space-y-1' >
                                    <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>
                                        35
                                    </Text>
                                    <Text style={{ fontSize: hp(1.3) }} className='font-bold text-neutral-700'>
                                        Mins
                                    </Text>
                                </View>

                            </View>

                            <View className='flex rounded-full bg-amber-300 p-2'>
                                <View
                                    style={{ width: hp(6.5), height: hp(6.5) }}
                                    className='bg-white rounded-full flex items-center justify-center'>
                                    <FontAwesome name="users" size={hp(5)} color="gray" />
                                </View>

                                <View className='flex items-center py-2 space-y-1' >
                                    <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>
                                        03
                                    </Text>
                                    <Text style={{ fontSize: hp(1.3) }} className='font-bold text-neutral-700'>
                                        Serving
                                    </Text>
                                </View>

                            </View>

                            <View className='flex rounded-full bg-amber-300 p-2'>
                                <View
                                    style={{ width: hp(6.5), height: hp(6.5) }}
                                    className='bg-white rounded-full flex items-center justify-center'>
                                    <FontAwesome6 name="fire" size={hp(5)} color="gray" />
                                </View>

                                <View className='flex items-center py-2 space-y-1' >
                                    <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>
                                        105
                                    </Text>
                                    <Text style={{ fontSize: hp(1.3) }} className='font-bold text-neutral-700'>
                                        Cal
                                    </Text>
                                </View>

                            </View>

                            <View className='flex rounded-full bg-amber-300 p-2'>
                                <View
                                    style={{ width: hp(6.5), height: hp(6.5) }}
                                    className='bg-white rounded-full flex items-center justify-center'>
                                    <Octicons name="stack" size={hp(5)} color="gray" />
                                </View>

                                <View className='flex items-center py-2 space-y-1' >
                                    <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>

                                    </Text>
                                    <Text style={{ fontSize: hp(1.3) }} className='font-bold text-neutral-700'>
                                        Easy
                                    </Text>
                                </View>

                            </View>

                        </Animated.View>


                        <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className='space-y-2'>
                            <Text style={{ fontSize: hp(2.5) }} className='font-bold flex-1 text-neutral-700'>
                                Ingredients
                            </Text>
                            <View className='space-y-2 ml-3'>
                                {
                                    ingredientIndex(mealDetails as MealDetails).map(i => {
                                        return (
                                            <View key={i} className='flex-row space-x-4'>
                                                <View style={{ width: hp(1.5), height: hp(1.5) }}
                                                    className='bg-amber-300 rounded-full' />


                                                <View className='flex-row space-x-2'>
                                                    <Text style={{ fontSize: hp(1.7) }} className='font-extrabold text-neutral-700'>
                                                        {(mealDetails as any)['strMeasure' + i]}
                                                    </Text>
                                                    <Text style={{ fontSize: hp(1.7) }} className='font-medium text-neutral-600'>
                                                        {(mealDetails as any)['strIngredient' + i]}
                                                    </Text>
                                                </View>
                                            </View>
                                        );
                                    })
                                }
                            </View>


                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className='space-y-4'>
                            <Text style={{ fontSize: hp(2.5) }} className=' font-bold flex-1 text-neutral-700'>Instructions</Text>
                            <Text style={{ fontSize: hp(1.6) }} className=' text-neutral-700'>{mealDetails?.strInstructions}</Text>
                        </Animated.View>

                        {
                            mealDetails?.strYoutube &&
                            <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} className='space-y-4'>
                                <Text style={{ fontSize: hp(2.5) }} className=' font-bold text-neutral-700 flex-1'>Recipe Video</Text>

                                <View>
                                    <YoutubePlayer
                                        videoId={getYouTubeVideoId(mealDetails.strYoutube)}
                                        height={hp(35)}
                                    />
                                </View>

                            </Animated.View>
                        }


                    </View>

            }



            <StatusBar style='light' />
        </ScrollView>
    );
};

export default RecipeDetails;