import { updateProfile } from "@/actions/profile";
import { profile as profileCopy } from "@/lib/copy";

type ProfileFormProps = {
  email: string;
  defaultValues: {
    full_name: string;
    bio: string;
    avatar_url: string;
  };
};

const inputClass =
  "w-full rounded-lg border border-background bg-background px-3 py-2 text-foreground outline-none focus:border-primary";

export function ProfileForm({ email, defaultValues }: ProfileFormProps) {
  return (
    <form
      action={updateProfile}
      className="mx-auto w-full max-w-lg space-y-5 rounded-2xl border border-card bg-card p-8"
    >
      <div>
        <p className="text-sm text-muted">{email}</p>
      </div>

      <div>
        <label
          className="mb-1 block text-sm text-muted"
          htmlFor="full_name"
        >
          {profileCopy.form.fullName}
        </label>
        <input
          id="full_name"
          name="full_name"
          defaultValue={defaultValues.full_name}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-muted" htmlFor="bio">
          {profileCopy.form.bio}
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          placeholder={profileCopy.form.bioPlaceholder}
          defaultValue={defaultValues.bio}
          className={inputClass}
        />
      </div>

      <div>
        <label
          className="mb-1 block text-sm text-muted"
          htmlFor="avatar_url"
        >
          {profileCopy.form.avatar}
        </label>
        <input
          id="avatar_url"
          name="avatar_url"
          type="url"
          placeholder="https://..."
          defaultValue={defaultValues.avatar_url}
          className={inputClass}
        />
        <p className="mt-1 text-xs text-muted">{profileCopy.form.avatarHint}</p>
      </div>

      {defaultValues.avatar_url && (
        <img
          src={defaultValues.avatar_url}
          alt="Foto de perfil"
          className="h-24 w-24 rounded-full object-cover border border-card"
        />
      )}

      <button
        type="submit"
        className="w-full rounded-lg bg-primary py-2 font-medium text-white transition-colors hover:bg-primary-hover"
      >
        {profileCopy.form.save}
      </button>
    </form>
  );
}
