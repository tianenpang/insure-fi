import { default as mime } from 'mime';
import type { FilesSource } from 'nft.storage';

export interface IMetadataPrams {
  address?: string;
  policyID?: number;
  description?: string;
  files?: File[] | undefined;
}

export interface IMetadata {
  address: string;
  policyID: number;
  description: string;
  files: File[];
}

export class Metadata implements IMetadata {
  address: string;
  policyID: number;
  description: string;
  files: File[];

  constructor({ address, policyID, description, files }: IMetadata) {
    this.address = address;
    this.policyID = policyID;
    this.description = description;
    this.files = files;
  }

  getMetadataFile(): File {
    return new File(
      [
        JSON.stringify(
          {
            address: this.address,
            policyID: this.policyID,
            description: this.description,
            files: this.files.map((file: File, index: number) => ({
              index: index + 1,
              name: `${index + 1}.${mime.getExtension(file.type)}`,
              originalName: file.name,
              type: file.type,
              size: file.size,
              datetime: file.lastModified
            }))
          },
          null,
          2
        )
      ],
      'metadata.json'
    );
  }

  toFilesSource(): FilesSource {
    return [
      ...this.files.map((file: File, index: number) => new File([file], `${index + 1}.${mime.getExtension(file.type)}`)),
      this.getMetadataFile()
    ];
  }
}
