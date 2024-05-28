import Input from '@components/ui/input';
import PasswordInput from '@components/ui/password-input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import Logo from '@components/ui/logo';
import { useUI } from '@contexts/ui.context';
import { useSignUpMutation, SignUpInputType } from '@framework/auth/use-signup';
import { ImGoogle2, ImFacebook2 } from 'react-icons/im';
import Link from '@components/ui/link';
import { ROUTES } from '@utils/routes';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
const SignUpForm: React.FC = () => {
	const { t } = useTranslation();
	const { mutate: signUp, isPending } = useSignUpMutation();
	const { setModalView, openModal, closeModal } = useUI();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<SignUpInputType>();

	function handleSignIn() {
		setModalView('LOGIN_VIEW');
		return openModal();
	}

	function onSubmit({
		name,
		email,
		password,
		phone,
		user_type = '2',
	}: SignUpInputType) {
		const deviceName = navigator.userAgent;
		const formData = {
			name,
			email,
			password,
			phone,
			user_type,
			device_name: deviceName,
		};

		axios.post('http://38.180.11.233/api/auth/register', formData)
			.then((response) => {
				console.log('Response:', response);
				const { accessToken, user } =
					response.data.payload;
				Cookies.set(
					'token',
					accessToken.plainTextToken
				);
				Cookies.set('user', JSON.stringify(user));
				signUp(formData);

				closeModal();

				router.push('/');
			})
			.catch((error) => {
				if (
					error.response &&
					error.response.status === 422
				) {
					const errorMessages = Object.values(
						error.response.data.errors
					).join(' ');
					setErrorMessage(errorMessages);
					clearForm();
				} else {
					console.error('Error:', error);
				}
			});
	}
	// Function to clear phone field and reset form
	function clearForm() {
		reset({
			name: '',
			email: '',
			password: '',
			phone: '', // Clearing the phone field
		});
	}
	return (
		<div className="py-5 px-5 sm:px-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
			{errorMessage && (
				<div className="bg-red-200 text-red-700 p-2 rounded-md mb-4">
					{errorMessage}
				</div>
			)}
			<div className="text-center mb-6 pt-2.5">
				<div onClick={closeModal}>
					<Logo />
				</div>
				<p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
					{t('common:registration-helper')}{' '}
					<Link
						href={ROUTES.TERMS}
						className="text-heading underline hover:no-underline focus:outline-none"
					>
						{t('common:text-terms')}
					</Link>{' '}
					&amp;{' '}
					<Link
						href={ROUTES.POLICY}
						className="text-heading underline hover:no-underline focus:outline-none"
					>
						{t('common:text-policy')}
					</Link>
				</p>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col justify-center"
				noValidate
			>
				<div className="flex flex-col space-y-4">
					<Input
						labelKey="forms:label-name"
						type="text"
						variant="solid"
						{...register('name', {
							required: 'forms:name-required',
						})}
						errorKey={errors.name?.message}
					/>
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
					<Input
						labelKey="forms:label-phone"
						type="text"
						variant="solid"
						{...register('phone', {
							required: 'forms:phone-required',
						})}
						errorKey={errors.phone?.message}
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
					<div className="relative">
						<Button
							type="submit"
							loading={isPending}
							disabled={isPending}
							className="h-11 md:h-12 w-full mt-2"
						>
							{t(
								'common:text-register'
							)}
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
				type="submit"
				loading={isPending}
				disabled={isPending}
				className="h-11 md:h-12 w-full mt-2.5 bg-facebook hover:bg-facebookHover"
			>
				<ImFacebook2 className="text-sm sm:text-base ltr:mr-1.5 rtl:ml-1.5" />
				{t('common:text-login-with-facebook')}
			</Button>
			<Button
				type="submit"
				loading={isPending}
				disabled={isPending}
				className="h-11 md:h-12 w-full mt-2.5 bg-google hover:bg-googleHover"
			>
				<ImGoogle2 className="text-sm sm:text-base ltr:mr-1.5 rtl:ml-1.5" />
				{t('common:text-login-with-google')}
			</Button>
			<div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
				{t('common:text-have-account')}{' '}
				<button
					type="button"
					className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
					onClick={handleSignIn}
				>
					{t('common:text-login')}
				</button>
			</div>
		</div>
	);
};

export default SignUpForm;
