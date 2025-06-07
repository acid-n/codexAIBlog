"use client";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";
import TiptapEditor from "./tiptap-editor";
import TagsInput from "./TagsInput";

const schema = z.object({
  title: z.string().min(1, "Заголовок обязателен").max(80),
  slug: z.string().optional(),
  description: z.string().min(1, "Описание обязательно").max(160),
  body: z.any(),
  is_published: z.boolean(),
  sitemap_include: z.boolean(),
  sitemap_priority: z.number().min(0).max(1),
  sitemap_changefreq: z.string(),
  meta_description: z.string().optional(),
  meta_keywords: z.string().optional(),
  tags: z.array(z.number()),
});

export type PostFormData = z.infer<typeof schema>;

interface Tag {
  id: number;
  name: string;
}
interface Props {
  initialData?: PostFormData;
  allTags: Tag[];
  onSubmit: (data: PostFormData) => void;
}

export default function PostForm({ initialData, allTags, onSubmit }: Props) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
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
      tags: [],
    },
  });

  const [publish, setPublish] = useState(false);

  const title = watch("title");
  const tags = watch("tags");
  const body = watch("body");

  useEffect(() => {
    if (title) {
      setValue(
        "slug",
        slugify(title, { lower: true, strict: true, locale: "ru" }),
      );
    }
  }, [title, setValue]);

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
        onSubmit({ ...data, is_published: publish }),
      )}
      className="space-y-6"
    >
      <div>
        <label htmlFor="title" className="block mb-1">
          Заголовок
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
        <label className="block mb-1">Контент</label>
        <Controller
          control={control}
          name="body"
          render={({ field }) => (
            <TiptapEditor content={field.value} onChange={field.onChange} />
          )}
        />
      </div>
      <div>
        <label className="block mb-1">Теги</label>
        <TagsInput
          available={allTags}
          value={tags}
          onChange={(ids) => setValue("tags", ids)}
        />
      </div>
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
        <label className="block mb-1">Meta description</label>
        <textarea
          {...register("meta_description")}
          className="w-full border rounded p-2"
          rows={2}
        />
      </div>
      <div>
        <label className="block mb-1">Meta keywords</label>
        <input
          type="text"
          {...register("meta_keywords")}
          className="w-full border rounded p-2"
        />
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          onClick={() => setPublish(false)}
          className="rounded bg-gray-600 px-4 py-2 text-white"
        >
          Сохранить черновик
        </button>
        <button
          type="submit"
          onClick={() => setPublish(true)}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Опубликовать
        </button>
      </div>
    </form>
  );
}
