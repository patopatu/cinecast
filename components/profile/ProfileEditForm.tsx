"use client";

import { useState } from "react";
import Link from "next/link";
import { updateProfile } from "@/actions/profile";
import { profile as profileCopy } from "@/lib/copy";

type ProfileEditFormProps = {
  email: string;
  defaultValues: {
    full_name: string;
    bio: string;
    avatar_url: string;
  };
};

const inputClass =
  "w-full rounded-lg border border-background bg-background px-3 py-2 text-foreground outline-none focus:border-primary";
const labelClass = "mb-1 block text-sm font-medium text-foreground";

export function ProfileEditForm({
  email,
  defaultValues,
}: ProfileEditFormProps) {
  const [fullName, setFullName] = useState(defaultValues.full_name);
  const [avatarUrl, setAvatarUrl] = useState(defaultValues.avatar_url);
  const initials = (fullName || email).slice(0, 1).toUpperCase();

  return (
    <form action={updateProfile} className="space-y-10">
      {/* ===================== IDENTIDADE ===================== */}
      <section>
        <h2 className="text-eyebrow mb-4 text-electric">
          {profileCopy.form.sectionIdentity}
        </h2>

        {/* Foto com preview */}
        <div className="mb-6 flex items-center gap-5">
          <div
            className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white/10 bg-card text-3xl font-display text-cream shadow-lg shadow-black/40"
            aria-label="Pré-visualização da foto"
          >
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt={fullName}
                className="h-full w-full object-cover"
              />
            ) : (
              initials
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">
              Foto de perfil
            </p>
            <p className="mt-0.5 text-xs text-muted">
              {profileCopy.form.avatarHint}
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="full_name">
              {profileCopy.form.fullName}
            </label>
            <input
              id="full_name"
              name="full_name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="city">
              {profileCopy.form.city}
            </label>
            <input
              id="city"
              name="city"
              type="text"
              placeholder="Ex.: São Paulo, SP"
              defaultValue=""
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-5">
          <label className={labelClass} htmlFor="avatar_url">
            {profileCopy.form.avatar}
          </label>
          <input
            id="avatar_url"
            name="avatar_url"
            type="url"
            placeholder="https://..."
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="mt-5">
          <label className={labelClass} htmlFor="bio">
            {profileCopy.form.bio}
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={5}
            placeholder={profileCopy.form.bioPlaceholder}
            defaultValue={defaultValues.bio}
            className={inputClass}
          />
          <p className="mt-1 text-xs text-muted">
            Tom direto, terceira pessoa opcional, foco no que você faz.
          </p>
        </div>
      </section>

      {/* ===================== PRESENÇA PROFISSIONAL ===================== */}
      <section>
        <h2 className="text-eyebrow mb-4 text-electric">
          {profileCopy.form.sectionPresence}
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="instagram">
              {profileCopy.form.instagram}
            </label>
            <input
              id="instagram"
              name="instagram"
              type="text"
              placeholder={profileCopy.form.instagramPlaceholder}
              defaultValue=""
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="website">
              {profileCopy.form.website}
            </label>
            <input
              id="website"
              name="website"
              type="url"
              placeholder={profileCopy.form.websitePlaceholder}
              defaultValue=""
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-5">
          <label className={labelClass} htmlFor="reel">
            {profileCopy.form.reel}
          </label>
          <input
            id="reel"
            name="reel"
            type="url"
            placeholder={profileCopy.form.reelPlaceholder}
            defaultValue=""
            className={inputClass}
          />
          <p className="mt-1 text-xs text-muted">
            Cole o link do Vimeo, YouTube ou do seu site. Produtores avaliam
            reel em segundos.
          </p>
        </div>
      </section>

      {/* ===================== AÇÕES ===================== */}
      <div className="flex flex-col-reverse items-stretch gap-3 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/profile"
          className="btn-ghost justify-center text-sm sm:justify-start"
        >
          ← {profileCopy.form.cancel}
        </Link>
        <button type="submit" className="btn-primary justify-center text-sm">
          {profileCopy.form.save}
        </button>
      </div>
    </form>
  );
}
