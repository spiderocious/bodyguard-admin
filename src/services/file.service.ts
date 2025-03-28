/* eslint-disable @typescript-eslint/no-explicit-any */
// FileService.js
import axios, { AxiosInstance } from "axios";
import { baseUrl } from "./api.service";

class FileService {
  private _axios: AxiosInstance;
  private _baseUrl: string = baseUrl;
  constructor() {
    this._baseUrl = `${this._baseUrl}/file/v1/files`;
    this._axios = axios.create({
      baseURL: this._baseUrl,
    });
  }

  async uploadFile(file: File, fileName: any) {
    try {
      const formData = new FormData();
      const fileExtension = fileName.split(".").pop().toLowerCase();
      const contentType = this._getContentType(fileExtension);

      if (file instanceof Uint8Array || file instanceof ArrayBuffer) {
        const blob = new Blob([file], { type: contentType });
        formData.append("file", blob, fileName);
      } else if (file instanceof File) {
        formData.append("file", file);
      } else {
        throw new Error("Unsupported file type");
      }

      const response = await this._axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 && response.data.success) {
        return response.data.fileKey;
      }
      return null;
    } catch (error: any) {
      console.error("Upload error:", error.response?.data || error.message);
      return null;
    }
  }

  async getFileUri(fileKey: string, returnAll = false) {
    try {
      const response = await this._axios.get(`/s3file/${fileKey}`);

      if (response.status === 200) {
        return returnAll
          ? {
              ...response.data,
              hostedURL: response.data.url,
            }
          : response.data.streamURL;
      }
      return null;
    } catch (error) {
      console.error("Error getting file URI:", error);
      return null;
    }
  }

  _getContentType(fileExtension: string) {
    const contentTypes: { [key: string]: string } = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      pdf: "application/pdf",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    };

    return contentTypes[fileExtension] || "application/octet-stream";
  }
}

export default FileService;
