"use client";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";
import TiptapEditor from "./tiptap-editor";
import TagInput from "./TagInput";
import { logger } from "../lib/logger";
import ImageUploader from "./image-uploader";
import Tooltip from "./Tooltip";
import { FaTrash, FaTimes, FaPaperPlane, FaSave } from "react-icons/fa";

const schema = z.object({
  title: z.string().min(1, "Заголовок обязателен").max(80),
  slug: z.string().optional(),
  description: z.string().min(1, "Описание обязательно").max(160),
  body: z.any(),
  is_published: z.boolean(),
  sitemap_include: z.boolean(),
  sitemap_priority: z.number().min(0).max(1),
  sitemap_changefreq: z.string(),
  meta_description: z.string().min(1, "Meta description обязателен").max(160),
  meta_keywords: z.string().min(1, "Meta keywords обязательны").max(160),
  image: z.any().optional(),
  tags: z.array(z.number()),
});

export type PostFormData = z.infer<typeof schema>;

interface Tag {
  id: number;
  name: string;
}
interface Props {
  initialData?: PostFormData;
  onSubmit: (data: PostFormData) => void;
  onSaveDraft?: (data: PostFormData) => void;
  onCancel?: () => void;
  onDelete?: () => void;
}

export default function PostForm({
  initialData,
  onSubmit,
  onSaveDraft,
  onCancel,
  onDelete,
}: Props) {
  const showTags = process.env.NEXT_PUBLIC_ENABLE_TAGS !== "false";
  if (!showTags) {
    logger.info("Tag input disabled via NEXT_PUBLIC_ENABLE_TAGS");
  }
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty, dirtyFields, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData ?? {
      title: "",
      slug: "",
      description: "",
      body: { type: "doc", content: [] },
      is_published: false,
      sitemap_include: true,
      sitemap_priority: 0.5,
      sitemap_changefreq: "monthly",
      meta_description: "",
      meta_keywords: "",
      image: null,
      tags: [],
    },
  });

  const title = watch("title");
  const slugValue = watch("slug");
  const descriptionValue = watch("description");
  const metaDescriptionValue = watch("meta_description");
  const metaKeywordsValue = watch("meta_keywords");
  const tags = watch("tags");
  const body = watch("body");
  const image = watch("image");

  useEffect(() => {
    if (title && !dirtyFields.slug) {
      setValue(
        "slug",
        slugify(title, { lower: true, strict: true, locale: "ru" }),
      );
    }
  }, [title, setValue, dirtyFields.slug]);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit({ ...data, is_published: true }),
      )}
      className="space-y-6"
    >
      <div>
        <label htmlFor="title" className="block mb-1">
          Заголовок
          <span className="ml-2 text-sm text-gray-500">
            {title?.length || 0}/80
          </span>
        </label>
        <input
          id="title"
          {...register("title")}
          className="w-full border rounded p-2"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="slug" className="block mb-1">
          Slug
          <span className="ml-2 text-sm text-gray-500">
            {slugValue?.length || 0}
          </span>
        </label>
        <input
          id="slug"
          {...register("slug")}
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label htmlFor="description" className="block mb-1">
          Описание
          <span className="ml-2 text-sm text-gray-500">
            {descriptionValue?.length || 0}/160
          </span>
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="w-full border rounded p-2"
          rows={3}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-1">Анонс-изображение</label>
        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <ImageUploader onUploadComplete={(f) => field.onChange(f)} />
          )}
        />
      </div>
      <div>
        <label className="block mb-1">Контент</label>
        <Controller
          control={control}
          name="body"
          render={({ field }) => (
            <TiptapEditor content={field.value} onChange={field.onChange} />
          )}
        />
      </div>
      {showTags && (
        <div>
          <label className="block mb-1">Теги</label>
          <TagInput value={tags} onChange={(ids) => setValue("tags", ids)} />
        </div>
      )}
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("sitemap_include")} /> В Sitemap
        </label>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Приоритет</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="1"
            {...register("sitemap_priority", { valueAsNumber: true })}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Частота</label>
          <select
            {...register("sitemap_changefreq")}
            className="w-full border rounded p-2"
          >
            <option value="always">Всегда</option>
            <option value="hourly">Ежечасно</option>
            <option value="daily">Ежедневно</option>
            <option value="weekly">Еженедельно</option>
            <option value="monthly">Ежемесячно</option>
            <option value="yearly">Ежегодно</option>
            <option value="never">Никогда</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block mb-1">
          Meta description
          <span className="ml-2 text-sm text-gray-500">
            {metaDescriptionValue?.length || 0}/160
          </span>
        </label>
        <textarea
          {...register("meta_description")}
          className="w-full border rounded p-2"
          rows={2}
        />
      </div>
      <div>
        <label className="block mb-1">
          Meta keywords
          <span className="ml-2 text-sm text-gray-500">
            {metaKeywordsValue?.length || 0}/160
          </span>
        </label>
        <input
          type="text"
          {...register("meta_keywords")}
          className="w-full border rounded p-2"
        />
      </div>
      <div className="flex gap-4">
        {onSaveDraft && (
          <Tooltip content="Сохранить черновик">
            <button
              type="button"
              onClick={handleSubmit((d) =>
                onSaveDraft({ ...d, is_published: false }),
              )}
              disabled={isSubmitting}
              className="p-2 rounded bg-yellow-600 text-white disabled:opacity-50"
            >
              {isSubmitting ? "..." : <FaSave />}
            </button>
          </Tooltip>
        )}
        <Tooltip content="Опубликовать">
          <button
            type="submit"
            disabled={isSubmitting}
            className="p-2 rounded bg-blue-600 text-white disabled:opacity-50"
          >
            {isSubmitting ? "..." : <FaPaperPlane />}
          </button>
        </Tooltip>
        {onCancel && (
          <Tooltip content="Отмена">
            <button
              type="button"
              onClick={onCancel}
              className="p-2 rounded bg-gray-500 text-white"
            >
              <FaTimes />
            </button>
          </Tooltip>
        )}
        {onDelete && (
          <Tooltip content="Удалить">
            <button
              type="button"
              onClick={onDelete}
              className="p-2 rounded bg-red-600 text-white"
            >
              <FaTrash />
            </button>
          </Tooltip>
        )}
      </div>
    </form>
  );
}
