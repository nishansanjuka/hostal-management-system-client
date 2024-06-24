import { User, UserJSON } from "@clerk/nextjs/server";
import { Role } from "@prisma/client";

export interface ExtdUserJson extends UserJSON {
  private_metadata: {
    role: Role;
  };
}

export interface ExtdUser extends User {
  privateMetadata: {
    role: Role;
  };
}

export interface UserBody {
  external_id: string;
  first_name: string;
  last_name: string;
  email_address: string[];
  phone_number: string[];
  web3_wallet: string[];
  username: string;
  password: string;
  password_digest: string;
  password_hasher: "argon2i";
  skip_password_checks: true;
  skip_password_requirement: true;
  totp_secret: string;
  backup_codes: string[];
  public_metadata: {
    hostel: number | undefined;
    room: number | undefined;
  };
  private_metadata: {
    role: Role;
  };
  unsafe_metadata: Record<string, unknown>;
  created_at: string;
}
