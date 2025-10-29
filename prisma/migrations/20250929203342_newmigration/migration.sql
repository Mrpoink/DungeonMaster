/*
  Warnings:

  - You are about to drop the `CHARACTERVECTOR` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ITEMSVECTOR` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MONSTERVECTOR` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SESSION` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SPELLSVECTOR` table. If the table is not empty, all the data it contains will be lost.

*/

-- CreateTable
CREATE TABLE "Monster" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" TEXT,
    "type" TEXT,
    "alignment" TEXT,
    "habitat" TEXT,
    "mainHabitat" TEXT,
    "otherHabitat" TEXT,
    "treasure" TEXT,
    "ac" TEXT,
    "hp" TEXT,
    "initiative" TEXT,
    "walk" TEXT,
    "burrow" TEXT,
    "climb" TEXT,
    "fly" TEXT,
    "hover" TEXT,
    "swim" TEXT,
    "strMod" TEXT,
    "intMod" TEXT,
    "dexMod" TEXT,
    "wisMod" TEXT,
    "conMod" TEXT,
    "chaMod" TEXT,
    "strSave" TEXT,
    "intSave" TEXT,
    "dexSave" TEXT,
    "wisSave" TEXT,
    "conSave" TEXT,
    "chaSave" TEXT,
    "proficient" TEXT,
    "expertise" TEXT,
    "vulnerabilities" TEXT,
    "slashing" TEXT,
    "immunitiesConditions" TEXT,
    "immunitiesDamage" TEXT,
    "blindsight" TEXT,
    "darkvision" TEXT,
    "truesight" TEXT,
    "tremorsense" TEXT,
    "passivePerception" TEXT,
    "languages" TEXT,
    "cr" TEXT,
    "XP." TEXT,
    "pb" TEXT,
    "traits" TEXT,
    "legendaryResistanceCount" TEXT,
    "# of Atk" TEXT,
    "atk1Type" TEXT,
    "atk1Mod" TEXT,
    "atk1Range" TEXT,
    "atk1RangeShort" TEXT,
    "atk1Dam" TEXT,
    "atk1DamageType" TEXT,
    "atk2Type" TEXT,
    "atk2Mod" TEXT,
    "atk2Range" TEXT,
    "atk2RangeShort" TEXT,
    "atk2Dam" TEXT,
    "atk2DamageType" TEXT,
    "atk3Type" TEXT,
    "atk3Mod" TEXT,
    "atk3Range" TEXT,
    "atk3RangeShort" TEXT,
    "atk3Dam" TEXT,
    "atk3DamageType" TEXT,
    "atk4Type" TEXT,
    "atk4Mod" TEXT,
    "atk4Range" TEXT,
    "atk4RangeShort" TEXT,
    "atk4Dam" TEXT,
    "atk4DamageType" TEXT,
    "saveDC" TEXT,
    "savingThrow" TEXT,
    "actionNotes" TEXT,
    "ability" TEXT,
    "spellSaveDC" TEXT,
    "spellSavingThrows" TEXT,
    "spellAttack" TEXT,
    "At Will" TEXT,
    "3/Day" TEXT,
    "2/Day" TEXT,
    "1/Day" TEXT,
    "bonusAction" TEXT,
    "reaction" TEXT,
    "amount" TEXT,
    "legendaryActionSaveDC" TEXT,
    "legendaryActionSavingThrow" TEXT,
    "Legendary Actions." TEXT,
    "lair" TEXT,
    "xp" TEXT,
    "Legendary Resistance" TEXT,
    "Legendary Actions" TEXT,
    "lairSaveDC" TEXT,
    "lairSavingThrows" TEXT,
    "other" TEXT,
    "align" TEXT,
    "speeds" TEXT,
    "STR" TEXT,
    "DEX" TEXT,
    "CON" TEXT,
    "INT" TEXT,
    "WIS" TEXT,
    "CHA" TEXT,
    "Sav. Throws" TEXT,
    "skills" TEXT,
    "WRI" TEXT,
    "senses" TEXT,
    "additional" TEXT,
    "font" TEXT,
    "additionalInfo" TEXT,
    "author" TEXT,

    CONSTRAINT "Monster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Race" (
    "id" SERIAL NOT NULL,
    "race" TEXT NOT NULL,
    "str" TEXT,
    "dex" TEXT,
    "con" TEXT,
    "int" TEXT,
    "wis" TEXT,
    "cha" TEXT,
    "special" TEXT,
    "source" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spell" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "castingTime" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "range" TEXT NOT NULL,
    "area" TEXT,
    "attack" TEXT,
    "save" TEXT,
    "damageEffect" TEXT NOT NULL,
    "ritual" TEXT,
    "concentration" TEXT,
    "verbal" TEXT,
    "somatic" TEXT,
    "material" TEXT,
    "material*" TEXT,
    "source" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Spell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "class" TEXT NOT NULL,
    "subclass" TEXT NOT NULL,
    "source" TEXT,
    "notes" TEXT,
    "features" TEXT,
    "level" TEXT,
    "description" TEXT,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MagicItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rarity" TEXT,
    "attunement" TEXT,
    "Cost (gp)" INTEGER,
    "note" TEXT,
    "Armor Cost" INTEGER,
    "Rare Material" TEXT,
    "AC Bonus" INTEGER,
    "Save Bonus" INTEGER,
    "Set Score (Modifier)" INTEGER,
    "+2 Bonus To Score (Y/N)" TEXT,
    "Weapon Bonus" INTEGER,
    "Spell Level" INTEGER,
    "Unlimited Charges (Y/N)" TEXT,
    "Charges/Day (Unlimit = 7)" INTEGER,
    "Charges/Item (Destroyed)" INTEGER,
    "Spells Share Charges" INTEGER,
    "Condition (1Min, Save)" TEXT,
    "Consumable Damage (Avg)" INTEGER,
    "Consumable Save? (Y/N)" TEXT,
    "Semi-Permanent Damage (Avg)" INTEGER,
    "Semi-Perm Save? (Y/N)" TEXT,
    "Duration? (Minutes)" INTEGER,
    "Permanent Damage (Avg)" INTEGER,
    "Perm Save? (Y/N)" TEXT,
    "Specific Situations (Y/N)" TEXT,
    "Restore HP (Avg)" INTEGER,
    "Misc. Costs" INTEGER,
    "2 Spell Level" INTEGER,
    "2 Unlimited Charges (Y/N)" TEXT,
    "2 Charges/Day (Unlimit = 7)" INTEGER,
    "3 Spell Level" INTEGER,
    "3 Unlimited Charges (Y/N)" TEXT,
    "3 Charges/Day (Unlimit = 7)" INTEGER,
    "MatCost" INTEGER,
    "ACCost" INTEGER,
    "SaveCost" INTEGER,
    "SetScore Cost" INTEGER,
    "BonusScore Cost" INTEGER,
    "WeaponCost" INTEGER,
    "Consum Spell Cost" INTEGER,
    "PermCharges Cost" INTEGER,
    "Charges - Destroyed" INTEGER,
    "SpellShare ChargesCost" INTEGER,
    "ConditionCost" INTEGER,
    "ConsDMG Cost" INTEGER,
    "Sm-PrDMG Cost" INTEGER,
    "PerDMG Cost" INTEGER,
    "AVGHP Cost" INTEGER,
    "MiscCost" INTEGER,
    "2 Consum Spell Cost" INTEGER,
    "2 Perm Charges Cost" INTEGER,
    "3 Consum Spell Cost" INTEGER,
    "3 Perm Charges Cost" INTEGER,

    CONSTRAINT "MagicItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneralEquipment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cost" TEXT NOT NULL,
    "Weight (lbs)" TEXT,

    CONSTRAINT "GeneralEquipment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Race_race_key" ON "Race"("race");

-- CreateIndex
CREATE UNIQUE INDEX "GeneralEquipment_name_key" ON "GeneralEquipment"("name");
