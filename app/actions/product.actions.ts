"use server";

import { getCurrentSession } from "@/auth/auth";
import { prisma } from "@/config/db";
import { productSchema } from "@/types";
import { revalidatePath } from "next/cache";
import { isValid } from "zod/v3";

/**
 * Add a product category to the database.
 * @param {FormData} formdata The form data from the add category form.
 * @returns {Promise<IResponse>} The response object with the status, message, and data.
 * @throws {Error} An error if the category already exists or if there is an issue with the database.
 */
export async function addProductCategory(formdata: FormData) {
  try {
    const categoryName = formdata.get("categoryName") as string;

    if (!categoryName || categoryName.trim() === "") {
      return {
        status: "error",
        message: "Merci de saisir un nom de catégorie valide.",
        data: null,
      };
    }
    const user = await getCurrentSession();
    if (!user) {
      return {
        status: "error",
        message: "Vous devez être connecté pour ajouter une catégorie.",
        data: null,
      };
    }
    // Check if the category already exists
    const existingCategory = await prisma.category.findFirst({
      where: {
        name: categoryName,
        businessId: Number(user.businessId),
      },
    });
    if (existingCategory) {
      return {
        status: "error",
        message: "Cette catégorie existe deja.",
        data: null,
      };
    }
    const newCategory = await prisma.category.create({
      data: {
        name: categoryName,
        businessId: Number(user.businessId),
      },
    });

    return {
      status: "success",
      message: "Catégorie ajoutée avec succès.",
      data: newCategory,
    };
  } catch (error) {
    console.error("Error adding product category:", error);
    return {
      status: "error",
      message: "Une erreur s'est produite lors de l'ajout de la catégorie.",
      data: null,
    };
  }
}

// add a product

export async function addProduct(formdata: FormData) {
  try {
const name = formdata.get("name") as string;
const price = Number(formdata.get("price"));
const costPrice = Number(formdata.get("costPrice"));
const rawCategoryId = formdata.get("categoryId");
const categoryId = rawCategoryId ? Number(rawCategoryId) : null;
const description = formdata.get("description") as string;
const minQuantity = formdata.get("minQuantity")
  ? Number(formdata.get("minQuantity"))
  : null;
const sku = formdata.get("sku") as string;
const quantity = Number(formdata.get("quantity"));
const isActive = formdata.get("isActive") === "true";
const unit = formdata.get("unit") as string;


    const user = await getCurrentSession();
    if (!user) {
      return {
        status: "error",
        message: "Vous devez être connecté pour ajouter un produit.",
        data: null,
      };
    }
    const businessId = Number(user.businessId);

    if (isNaN(price) || price <= 0) {
  return {
    status: "error",
    message: "Le prix doit être un nombre positif.",
    data: null,
  };
}
if (isNaN(costPrice) || costPrice <= 0) {
  return {
    status: "error",
    message: "Le prix de revient doit être un nombre positif.",
    data: null,
  };
}
if (isNaN(quantity) || quantity < 0) {
  return {
    status: "error",
    message: "La quantité doit être un nombre supérieur ou égal à zéro.",
    data: null,
  };
}
    const validationResult = await productSchema.safeParseAsync({
      name,
      price,
      costPrice,
      categoryId,
      description,
      minQuantity,
      sku,
      quantity,
      isActive,
      unit,
      businessId,
    });

    if (!validationResult.success) {
   console.log(validationResult.error.issues);
      return {
        status: "error",
        message: validationResult.error.issues[0].message,
        data: null,
      };
    }
    const category = await prisma.category.findFirst({
      where: {
        id: Number(categoryId),
        businessId,
      },
    });
    const isCategoryValid = !!category;

    const product = await prisma.product.create({
      data: {
        name,
        price,
        costPrice,
        categoryId: isCategoryValid ? categoryId : null,
        description,
        minQuantity,
        sku,
        quantity,
        isActive,
        unit,
        businessId,
      },
    });

    revalidatePath("/in/stock");
    return {
      status: "success",
      message: "Produit ajouté avec succès.",
      data: product,
    };
  } catch (error) {
    console.error(
      "Error adding product:",
      error instanceof Error ? error.message : error
    );
    return {
      status: "error",
      message: "Une erreur s'est produite lors de l'ajout du produit.",
      data: null,
    };
  }
}
