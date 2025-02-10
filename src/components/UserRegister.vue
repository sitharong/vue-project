<template>
  <div>
    <div class="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
      <div class="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
        <h2 class="text-gray-800 text-center text-2xl font-bold">Register</h2>

        <form>
          <div class="space-y-6">
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Name</label>
              <input name="name" type="text"
                class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter name" v-model="user.name" />
            </div>
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Email</label>
              <input name="email" type="text"
                class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter email" v-model="user.email" />
            </div>
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Password</label>
              <input name="cpassword" type="password"
                class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter password" v-model="user.password" />
            </div>

          </div>

          <div class="!mt-8">
            <button type="button"
              class="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              @click="createAccountClick()">
              Create an account
            </button>
          </div>
          <p class="text-gray-800 text-sm mt-6 text-center">Already have an account? <a href="/login"
              class="text-blue-600 font-semibold hover:underline ml-1">Login here</a></p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserModel } from '@/models/UserModel';
import { userService } from '@/services/UserService';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref(new UserModel());

const createAccountClick = async () => {
  console.log('createAccountClick');
  const res = await userService.register(user.value);
  if (res) {
    router.push('login')
  } else {
    console.log('registration error');
  }
}
</script>

<style lang="scss" scoped></style>
