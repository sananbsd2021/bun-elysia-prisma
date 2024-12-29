import { NotFoundError } from "elysia";
import prisma from "../../db";

export async function getLottos() {
  try {
    return await prisma.lotto.findMany({ orderBy: { createdAt: "asc" } });
  } catch (error) {
    console.error("Error getting Lottos ", error);
  }
}

export async function createLotto(data: {
  drawDate: Date;
  typeDigit: string;
  DigitOn: string;
}) {
  try {
    const { drawDate, typeDigit, DigitOn } = data;
    const lotto = await prisma.lotto.create({
      data: { drawDate, typeDigit, DigitOn },
    });
    if (!lotto) {
      throw new NotFoundError("Lotto not found");
    }
    return lotto;
  } catch (error) {
    console.error("Error Creating Lotto", error);
  }
}

export async function getLottoById(id: number) {
  try {
    const lotto = await prisma.lotto.findUnique({ where: { id } });
    if (!lotto) {
      throw new NotFoundError("Lotto not found");
    }
    return lotto;
  } catch (error) {
    console.error("Error getting Lotto with id ", id, error);
  }
}

export async function updateLotto(
  id: number,
  data: { drawDate?: Date; typeDigit?: string; DigitOn?: string }
) {
  try {
    const { drawDate, typeDigit, DigitOn } = data;
    const lotto = await prisma.lotto.update({
      where: { id },
      data: {
        ...(drawDate && { drawDate }),
        ...(typeDigit && { typeDigit }),
        ...(DigitOn && { DigitOn }),
      },
    });
    if (!lotto) {
      throw new NotFoundError("Lotto not found");
    }
    return lotto;
  } catch (error) {
    console.error("Error updating Lotto with id ", id, error);
  }
}

export async function deleteLotto(id: number) {
  try {
    const lotto = await prisma.lotto.delete({ where: { id } });
    if (!lotto) {
      throw new NotFoundError("Lotto not found");
    }
    return lotto;
  } catch (error) {
    console.error("Error deleting Lotto with id ", id, error);
  }
}
