import React, { useState } from 'react';
import Input from '@components/ui/input';
import PasswordInput from '@components/ui/password-input';
import Button from '@components/ui/button';
import Logo from '@components/ui/logo';
import { useUI } from '@contexts/ui.context';
import { useLoginMutation, LoginInputType } from '@framework/auth/use-login';
import { ImGoogle2, ImFacebook2 } from 'react-icons/im';
import { ROUTES } from '@utils/routes';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useTranslation } from 'next-i18next';

const LoginForm: React.FC = () => {
	const { t } = useTranslation();
	const { setModalView, openModal, closeModal } = useUI();
	const { mutate: login, isPending } = useLoginMutation();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<LoginInputType>();

	function handleSignUp() {
		setModalView('SIGN_UP_VIEW');
		openModal();
	}

	function handleForgetPassword() {
		setModalView('FORGET_PASSWORD');
		openModal();
	}

	async function onSubmit({
		email,
		password,
		remember_me,
	}: LoginInputType) {
		try {
			// Get the device name
			const deviceName = navigator.userAgent;

			// Append '#' to the email address
			const modifiedEmail = `${email}#`;

			const response = await axios.post(
				'http://38.180.11.233/api/auth/login',
				{
					email: modifiedEmail,
					password,
					remember_me,
					device_name: deviceName, // Include device name in the request
				}
			);

			const { accessToken, user } = response.data.payload;

			Cookies.set('token', accessToken.plainTextToken);
			Cookies.set('user', JSON.stringify(user));

			login({ email: modifiedEmail, password, remember_me });
			closeModal();
			router.push('/');
		} catch (error: any) {
			if (error.response && error.response.status === 422) {
				const errorMessages = Object.values(
					error.response.data.errors
				).join(' ');
				setErrorMessage(errorMessages);
				clearForm();
			} else {
				console.error('Error:', error);
			}
		}
	}

	function clearForm() {
		reset({
			email: '',
			password: '',
			remember_me: false,
		});
	}

	return (
		<div className="w-full px-5 py-5 mx-auto overflow-hidden bg-white border border-gray-300 rounded-lg sm:w-96 md:w-450px sm:px-8">
			{errorMessage && (
				<div className="bg-red-200 text-red-700 p-2 rounded-md mb-4">
					{errorMessage}
				</div>
			)}
			<div className="text-center mb-6 pt-2.5">
				<div onClick={closeModal}>
					<Logo />
				</div>
				<p className="mt-2 mb-8 text-sm md:text-base text-body sm:mb-10">
					{t('common:login-helper')}
				</p>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col justify-center"
				noValidate
			>
				<div className="flex flex-col space-y-3.5">
					<Input
						labelKey="forms:label-email"
						type="email"
						variant="solid"
						{...register('email', {
							required: `${t(
								'forms:email-required'
							)}`,
							pattern: {
								value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								message: t(
									'forms:email-error'
								),
							},
						})}
						errorKey={errors.email?.message}
					/>
					<PasswordInput
						labelKey="forms:label-password"
						errorKey={
							errors.password?.message
						}
						{...register('password', {
							required: `${t(
								'forms:password-required'
							)}`,
						})}
					/>
					<div className="flex items-center justify-center">
						<div className="flex items-center flex-shrink-0">
							<label className="relative inline-block w-10 cursor-pointer switch">
								<input
									id="remember"
									type="checkbox"
									className="w-0 h-0 opacity-0"
									{...register(
										'remember_me'
									)}
								/>
								<span className="absolute inset-0 transition-all duration-300 ease-in bg-gray-500 slider round"></span>
							</label>
							<label
								htmlFor="remember"
								className="flex-shrink-0 text-sm cursor-pointer text-heading ltr:pl-3 rtl:pr-3"
							>
								{t(
									'forms:label-remember-me'
								)}
							</label>
						</div>
						<div className="flex ltr:ml-auto rtl:mr-auto">
							<button
								type="button"
								onClick={
									handleForgetPassword
								}
								className="text-sm underline ltr:text-right rtl:text-left text-heading ltr:pl-3 rtl:pr-3 hover:no-underline focus:outline-none"
							>
								{t(
									'common:text-forgot-password'
								)}
							</button>
						</div>
					</div>
					<div className="relative">
						<Button
							type="submit"
							loading={isPending}
							disabled={isPending}
							className="h-11 md:h-12 w-full mt-1.5"
						>
							{t('common:text-login')}
						</Button>
					</div>
				</div>
			</form>
			<div className="flex flex-col items-center justify-center relative text-sm text-heading mt-6 mb-3.5">
				<hr className="w-full border-gray-300" />
				<span className="absolute -top-2.5 px-2 bg-white">
					{t('common:text-or')}
				</span>
			</div>
			<Button
				loading={isPending}
				disabled={isPending}
				className="h-11 md:h-12 w-full mt-2.5 bg-facebook hover:bg-facebookHover"
			>
				<ImFacebook2 className="text-sm sm:text-base ltr:mr-1.5 rtl:ml-1.5" />
				{t('common:text-login-with-facebook')}
			</Button>
			<Button
				loading={isPending}
				disabled={isPending}
				className="h-11 md:h-12 w-full mt-2.5 bg-google hover:bg-googleHover"
			>
				<ImGoogle2 className="text-sm sm:text-base ltr:mr-1.5 rtl:ml-1.5" />
				{t('common:text-login-with-google')}
			</Button>
			<div className="mt-5 mb-1 text-sm text-center sm:text-base text-body">
				{t('common:text-no-account')}{' '}
				<button
					type="button"
					className="text-sm font-bold underline sm:text-base text-heading hover:no-underline focus:outline-none"
					onClick={handleSignUp}
				>
					{t('common:text-register')}
				</button>
			</div>
		</div>
	);
};

export default LoginForm;
