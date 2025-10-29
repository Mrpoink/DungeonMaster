-- CreateTable
CREATE TABLE "public"."MagicItem" (
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
CREATE TABLE "public"."GeneralEquipment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cost" TEXT NOT NULL,
    "Weight (lbs)" TEXT,

    CONSTRAINT "GeneralEquipment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GeneralEquipment_name_key" ON "public"."GeneralEquipment"("name");
