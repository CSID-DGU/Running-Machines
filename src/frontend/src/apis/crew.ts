import {
  CrewChatRequest,
  CrewChatResponse,
  CrewGalleryDetaiCommentslResponse,
  CrewGalleryDetailResponse,
  CrewGalleryRequest,
  CrewGalleryResponse,
  CrewJoinResponse,
  CrewMemberDetailResponse,
  CrewMemberResponse,
  CrewNoticeDetailResponse,
  CrewNoticeRequest,
  CrewNoticeResponse,
  CrewResponse,
} from "@/types/crew";
import { api } from ".";

export const getCrewNotice = async (
  crewId: number
): Promise<CrewNoticeResponse> => {
  const response = await api.get(`/crew/${crewId}/notice`);
  return response.data;
};

export const postCrewNotice = async ({
  crewId,
  data,
}: {
  crewId: number;
  data: CrewNoticeRequest;
}) => {
  const response = await api.post(`/crew/${crewId}/notice`, { data });
  return response.data;
};

export const getCrewNoticeDetail = async (
  crewId: number,
  crewPostId: number
): Promise<CrewNoticeDetailResponse> => {
  const response = await api.get(`/crew/${crewId}/notice/${crewPostId}`);
  return response.data;
};

export const JoinCrew = async (crewId: number): Promise<CrewJoinResponse> => {
  const response = await api.post(`/crew/${crewId}/join`);
  return response.data;
};

export const CreateCrew = async ({
  certificationImage,
  profileImage,
}: {
  certificationImage: File;
  profileImage: File;
}) => {
  const formData = new FormData();
  formData.append("certificationImage", certificationImage);
  formData.append("profileImage", profileImage);

  const response = await api.post(`/crew/create`, formData);
  return response.data;
};

// 다른 크루 조회 api
export const getCrew = async (): Promise<CrewResponse[]> => {
  const response = await api.get(`/crew`);
  return response.data;
};

// 크루 멤버, 크루명, 포스팅 수 api
export const getCrewMember = async (
  crewId: number
): Promise<CrewMemberResponse> => {
  const response = await api.get(`/crew/${crewId}/member`);
  return response.data;
};

// 크루 멤버 프로필 조회 api
export const getCrewMemberDetail = async (
  crewId: number,
  memberId: number,
  year: number,
  month: number
): Promise<CrewMemberDetailResponse> => {
  const response = await api.get(
    `/crew/${crewId}/member/${memberId}/${year}/${month}`
  );
  return response.data;
};

export const getCrewGallery = async (
  crewId: number
): Promise<CrewGalleryResponse> => {
  const response = await api.get(`/crew/${crewId}/gallery`);
  return response.data;
};

export const getCrewGalleryDetail = async (
  crewId: number,
  postId: number
): Promise<CrewGalleryDetailResponse> => {
  const response = await api.get(`/crew/${crewId}/gallery/${postId}`);
  return response.data;
};

export const getCrewGalleryDetailComments = async (
  crewId: number,
  postId: number
): Promise<CrewGalleryDetaiCommentslResponse[]> => {
  const response = await api.get(`/crew/${crewId}/gallery/${postId}/comments`);
  return response.data;
};

export const postCrewGallery = async ({
  crewId,
  data,
}: {
  crewId: number;
  data: CrewGalleryRequest;
}) => {
  const formData = new FormData();
  formData.append("content", data.content);
  data.images.forEach((image) => {
    formData.append(`images`, image);
  });

  const response = await api.post(`/crew/${crewId}/gallery`, formData);
  return response.data;
};

export const postCrewGalleryComments = async (
  crewId: number,
  postId: number,
  content: string
) => {
  const response = await api.post(
    `/crew/${crewId}/gallery/${postId}/comments`,
    { content }
  );
  return response.data;
};

export const postCrewGalleryLike = async (crewId: number, postId: number) => {
  const response = await api.post(`/crew/${crewId}/gallery/${postId}/like`);
  return response.data;
};

export const getCrewChat = async (
  crewId: number
): Promise<CrewChatResponse[]> => {
  const response = await api.get(`/crew/${crewId}/chat`);
  return response.data;
};

export const postCrewChat = async (crewId: number, data: CrewChatRequest) => {
  const response = await api.post(`/crew/${crewId}/chat`, data);
  return response.data;
};
