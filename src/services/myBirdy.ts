import { CategoryState } from "@/app/(footershare)/mybirdy/(no-footer)/edit-category/page";
import api from "@/lib/api";
import { AxiosError } from "axios";

// 닉네임 수정
export const nickNameUpdateApi = async (nickname: string) => {
  try {
    const res = await api.post("/user/update/nickname", {
      nickname,
    });

    return res.status;
  } catch (error) {
    const err = error as AxiosError;
    console.error(
      "❌ 닉네임 업데이트 실패:",
      err.response?.data || err.message
    );
    throw err;
  }
};

// 카테고리 수정
export const categoryUpdate = async (userCategory: CategoryState) => {
  try {
    const { data } = await api.post("/user/update/category", userCategory);
    console.log(data);

    return data;
  } catch (error) {
    const err = error as AxiosError;
    console.error(
      "❌ 카테고리 업데이트 실패:",
      err.response?.data || err.message
    );
    throw err;
  }
};

// 회원 탈퇴
export const getWithDrawal = async (withdrawalType: string) => {
  try {
    const response = await api.post(`/auth/withdrawal`, {
      withdrawalType,
    });
    console.error("탈퇴성공: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};
