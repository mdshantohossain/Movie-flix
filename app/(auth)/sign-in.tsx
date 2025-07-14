import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as yup from "yup";

import { images } from "@/constants";
import FormField from "@/components/FormField";
import Button from "@/components/Button";
import { Redirect, router } from "expo-router";
import { signIn } from "@/libs/appwrite";
import { LoginFormDataType } from "@/types";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // redirect to home if user is already logged in
   const { isLoggedIn, isLoading } = useGlobalContext();
      if(!isLoggedIn && !isLoading) return <Redirect href="/home" />
  

  // validation scema for form
  const validationSchema = yup.object({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .min(6, "Password length must be 6 characters")
      .max(16, "Maximum password length will be 16 characters.")
      .required("Password is required"),
  });

  // handle form submit
  const handleSubmit = async (values: LoginFormDataType, { resetForm }: any) => {
    setIsSubmitting(true);

    try {

      await signIn(values.email, values.password);

      resetForm({ values: "" });
      router.replace("/home");

    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="w-full h-full justify-center px-4">
            <View className="items-center">
              <Image
                source={images.logo}
                className="w-[130px] h-[84px]"
                resizeMode="contain"
              />
            </View>

            <Text className="text-2xl text-white mt-10 font-psemibold text-center">
              Login to Movie Flix
            </Text>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, values, touched, handleChange, handleSubmit }) => (
                <View className="mt-10">
                  <FormField
                    label="Email"
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    onChangeText={handleChange("email")}
                    value={values.email}
                    error={touched.email && errors.email && errors.email}
                  />

                  <FormField
                    label="Password"
                    placeholder="Enter your password"
                    onChangeText={handleChange("password")}
                    value={values.password}
                    error={
                      touched.password && errors.password && errors.password
                    }
                    secureTextEntry={true}
                  />

                  <Button
                    label="Sign In"
                    containerStyles="mt-4 h-[42px]"
                    onPress={handleSubmit}
                    isLoading={isSubmitting}
                  />
                </View>
              )}
            </Formik>

            <View className="flex-row justify-center items-center mt-5">
              <Text className="text-[16px] text-white">
                Don't have an account?{" "}
              </Text>

              <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
                <Text
                  className="text-[16px] text-secondary-200 ml-2"
                  style={{ fontWeight: 600 }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignIn;
