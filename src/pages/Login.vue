<script setup>
import { ref } from 'vue';
import useAuthUser from '@/composables/UseAuthUser';
import { useRouter } from 'vue-router';
import { createToast } from 'mosha-vue-toastify';
import {initRule} from '@/utils';
initRule(['min', 'required']);

import { Form, Field, ErrorMessage } from 'vee-validate';


import github from '@/assets/svg/github.svg';
import google from '@/assets/svg/google.svg';
const router = useRouter();
const { login, loginWithSocialProvider } = useAuthUser();

const form = ref({
  email: '',
  password: '',
});

const validationSchema = {
  email: 'required|min:8',
  password: 'required|min:5'
};

const handleLoginWithCredentials = async() => {
  try {
    await login(form.value);
    createToast('Login Success',
        {
          type: 'success',
          transition: 'slide',
          showIcon: 'true',
          hideProgressBar: 'true'
        });
    router.push({ name: 'Home' });
  } catch (error) {

    createToast(error.message,
        {
          type: 'danger',
          transition: 'slide',
          showIcon: 'true',
          hideProgressBar: 'true'
        });

    console.log(error.message);
  }
};

const handleLogin = async(provider) => {
  try {
     await loginWithSocialProvider(provider);
    createToast('Login Success',
        {
          type: 'success',
          transition: 'slide',
          showIcon: 'true',
          hideProgressBar: 'true'
        });
    router.push({ name: 'Home' });
  } catch (error) {

    createToast(error.message,
        {
          type: 'danger',
          transition: 'slide',
          showIcon: 'true',
          hideProgressBar: 'true'
        });

    console.log(error.message);
  }
};
</script>

<script>
export default {
  computed: {
    errorClass() {
      return 'text-red-600 focus:ring-2 focus:ring-red-600';
    }
  },
};
</script>

<template>
	<div class="grid place-items-center h-screen sign-in">
		<div class="container mx-auto px-4 h-full">
			<div class="flex content-center items-center justify-center h-full">
				<div class="w-full md:w-7/12 lg:w-5/12 xl:w-1/3 px-4">
					<div class="flex content-center items-center justify-center py-10">
						<img
							src="@/assets/logo.png"
							alt=""
							:style="{ width: '25px' }"
						>
						<div class="text-center ml-2 font-bold text-3xl brand-text">
							Debugger Tech
						</div>
					</div>
					<div
						class="
              relative
              flex flex-col
              min-w-0
              break-words
              w-full
              mb-6
              shadow-lg
              rounded-lg
              bg-blueGray-200
              border-0
            "
					>
						<div class="rounded-t mb-0 px-6 py-6">
							<div class="text-center mb-3">
								<h6 class="text-blueGray-500 text-sm font-bold">
									Sign in with
								</h6>
							</div>
							<div class="btn-wrapper text-center">
								<span
									class="svg-icon"
									title="Linkedin"
									@click="handleLogin('github')"
								>
									<img
										v-svg-inline
										alt="..."
										class="linkedin-svg-icon"
										:src="github"
									>
									<!--                  @click="handleLogin('github')"-->
								</span>

								<span
									class="svg-icon"
									title="Google"
								>
									<img
										v-svg-inline
										alt="..."
										class="google-svg-icon"
										:src="google"
									>
								</span>
							</div>
							<hr class="mt-6 border-b-1 border-blueGray-300">
						</div>
						<div class="rounded-t mb-0 px-6 pt-6">
							<div class="text-center mb-3">
								<h6 class="text-blueGray-500 text-sm font-bold">
									Sign in with credentials
								</h6>
							</div>
							<hr class="mt-6 border-b-1 border-blueGray-300">
						</div>

						<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
							<Form
								ref="formRef"
								v-slot="{ errors, onSubmit }"
								:validationSchema="validationSchema"
								@submit="onSubmit"
							>
								<!--								<Field type="hidden" name="_token" :value="csrfToken" />-->

								<div class="relative w-full mb-3">
									<label
										class="
                      block
                      uppercase
                      text-blueGray-600 text-xs
                      font-bold
                      mb-2
                    "
										for="email"
									>
										Email
									</label>
									<Field
										id="email"
										v-model="form.email"
										label="Email"
										type="email"
										:class="[
											'auth-form-input',
											{ [errorClass]: !!errors.email },
										]"
										placeholder="Email"
										name="email"
										aria-describedby="emailHelp"
										validateOnInput
									/>
									<ErrorMessage
										id="emailHelp"
										class="text-xs text-red-600 font-bold tracking-wider"
										name="email"
									/>
								</div>

								<div class="relative w-full mb-3">
									<label
										class="
                      block
                      uppercase
                      text-blueGray-600 text-xs
                      font-bold
                      mb-2
                    "
										for="password"
									>
										Password
									</label>
									<Field
										id="password"
										v-model="form.password"
										label="Password"
										type="password"
										:class="[
											'auth-form-input',
											{ [errorClass]: !!errors.password },
										]"
										placeholder="Password"
										name="password"
										aria-describedby="passwordHelp"
										validateOnInput
									/>
									<ErrorMessage
										id="passwordHelp"
										class="text-xs text-red-600 font-bold tracking-wider"
										name="password"
									/>
								</div>
								<div>
									<label
										class="inline-flex items-center cursor-pointer"
										for="customCheckLogin"
									>
										<Field
											id="customCheckLogin"
											name="remember"
											type="checkbox"
											:value="true"
											class="
                        form-checkbox
                        border-0
                        rounded
                        text-blueGray-700
                        ml-1
                        w-5
                        h-5
                        ease-linear
                        transition-all
                        duration-150
                      "
										/>
										<span class="ml-2 text-sm font-semibold text-blueGray-600">
											Remember Me
										</span>
									</label>
								</div>

								<div class="text-center mt-6">
									<button
										class="btn-morgan"
										type="submit"
										@click.prevent="handleLoginWithCredentials()"
									>
										Sign In
									</button>
								</div>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
span.svg-icon {
  display: inline-block;
  margin: 2px 5px;
  box-shadow: 0 0 15px #fff;
  border-radius: 50%;
  cursor: pointer;
}
svg {
  width: 40px;
  height: 40px;
}
.sign-in {
  padding: 0!important;
}
</style>
