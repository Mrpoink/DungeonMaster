import tracemalloc
import math
import asyncio
import json
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'prisma', 'generated'))

from prisma import Prisma

tracemalloc.start()

async def add_to_db(file_path, database=None):
    

    db = Prisma()
    await db.connect()

    with open(file_path, 'r') as file:
        data = json.load(file)

    for key, value in data.items():

        print(f"{type(value)} | {value}*************")
        
        new_item = await db.magicitem.create(
            data={
                'name': key.strip(),
                'rarity': value.get('Rarity'),
                'attunement': value.get('Attunement'),
                'costGp': int(value['Cost (gp)'].strip()) if value.get('Cost (gp)', '').strip() else None,
                'note': value.get('Note'),
                'armorCost': int(value['Armor Cost'].strip()) if value.get('Armor Cost', '').strip() else None,
                'rareMaterial': value.get('Rare Material'),
                'acBonus': int(value['AC Bonus'].strip()) if value.get('AC Bonus', '').strip() else None,
                'saveBonus': int(value['Save Bonus'].strip()) if value.get('Save Bonus', '').strip() else None,
                'setScoreModifier': int(value['Set Score (Modifier)'].strip()) if value.get('Set Score (Modifier)', '').strip() else None,
                'plusTwoBonusToScore': value.get('+2 Bonus To Score (Y/N)'),
                'weaponBonus': int(value['Weapon Bonus'].strip()) if value.get('Weapon Bonus', '').strip() else None,
                'spellLevel': int(value['Spell Level'].strip()) if value.get('Spell Level', '').strip() else None,
                'unlimitedCharges': value.get('Unlimited Charges (Y/N)'),
                'chargesPerDay': int(value['Charges/Day (Unlimit = 7)'].strip()) if value.get('Charges/Day (Unlimit = 7)', '').strip() else None,
                'chargesPerItem': int(value['Charges/Item (Destroyed)'].strip()) if value.get('Charges/Item (Destroyed)', '').strip() else None,
                'spellsShareCharges': int(value['Spells Share Charges'].strip()) if value.get('Spells Share Charges', '').strip() else None,
                'condition': value.get('Condition (1Min, Save)'),
                'consumableDamageAvg': int(value['Consumable Damage (Avg)'].strip()) if value.get('Consumable Damage (Avg)', '').strip() else None,
                'consumableSave': value.get('Consumable Save? (Y/N)'),
                'semiPermanentDamageAvg': int(value['Semi-Permanent Damage (Avg)'].strip()) if value.get('Semi-Permanent Damage (Avg)', '').strip() else None,
                'semiPermSave': value.get('Semi-Perm Save? (Y/N)'),
                'durationMinutes': int(value['Duration? (Minutes)'].strip()) if value.get('Duration? (Minutes)', '').strip() else None,
                'permanentDamageAvg': int(value['Permanent Damage (Avg)'].strip()) if value.get('Permanent Damage (Avg)', '').strip() else None,
                'permSave': value.get('Perm Save? (Y/N)'),
                'specificSituations': value.get('Specific Situations (Y/N)'),
                'restoreHpAvg': int(value['Restore HP (Avg)'].strip()) if value.get('Restore HP (Avg)', '').strip() else None,
                'miscCosts': int(value['Misc. Costs'].strip()) if value.get('Misc. Costs', '').strip() else None,
                'secondSpellLevel': int(value['2 Spell Level'].strip()) if value.get('2 Spell Level', '').strip() else None,
                'secondUnlimitedCharges': value.get('2 Unlimited Charges (Y/N)'),
                'secondChargesPerDay': int(value['2 Charges/Day (Unlimit = 7)'].strip()) if value.get('2 Charges/Day (Unlimit = 7)', '').strip() else None,
                'thirdSpellLevel': int(value['3 Spell Level'].strip()) if value.get('3 Spell Level', '').strip() else None,
                'thirdUnlimitedCharges': value.get('3 Unlimited Charges (Y/N)'),
                'thirdChargesPerDay': int(value['3 Charges/Day (Unlimit = 7)'].strip()) if value.get('3 Charges/Day (Unlimit = 7)', '').strip() else None,
                'matCost': int(value['MatCost'].strip()) if value.get('MatCost', '').strip() else None,
                'acCost': int(value['ACCost'].strip()) if value.get('ACCost', '').strip() else None,
                'saveCost': int(value['SaveCost'].strip()) if value.get('SaveCost', '').strip() else None,
                'setScoreCost': int(value['SetScore Cost'].strip()) if value.get('SetScore Cost', '').strip() else None,
                'bonusScoreCost': int(value['BonusScore Cost'].strip()) if value.get('BonusScore Cost', '').strip() else None,
                'weaponCost': int(value['WeaponCost'].strip()) if value.get('WeaponCost', '').strip() else None,
                'consumSpellCost': int(value['Consum Spell Cost'].strip()) if value.get('Consum Spell Cost', '').strip() else None,
                'permChargesCost': int(value['PermCharges Cost'].strip()) if value.get('PermCharges Cost', '').strip() else None,
                'chargesDestroyed': int(value['Charges - Destroyed'].strip()) if value.get('Charges - Destroyed', '').strip() else None,
                'spellShareChargesCost': int(value['SpellShare ChargesCost'].strip()) if value.get('SpellShare ChargesCost', '').strip() else None,
                'conditionCost': int(value['ConditionCost'].strip()) if value.get('ConditionCost', '').strip() else None,
                'consDMGCost': int(value['ConsDMG Cost'].strip()) if value.get('ConsDMG Cost', '').strip() else None,
                'smPrDMGCost': int(math.ceil(float(value['Sm-PrDMG Cost'].strip()))) if value.get('Sm-PrDMG Cost', '').strip() else None,
                'perDMGCost': int(math.ceil(float(value['PerDMG Cost'].strip()))) if value.get('PerDMG Cost', '').strip() else None,
                'avgHPCost': int(math.ceil(float(value['AVGHP Cost'].strip()))) if value.get('AVGHP Cost', '').strip() else None,
                'miscCost': int(value['MiscCost'].strip()) if value.get('MiscCost', '').strip() else None,
                'secondConsumSpellCost': int(value['2 Consum Spell Cost'].strip()) if value.get('2 Consum Spell Cost', '').strip() else None,
                'secondPermChargesCost': int(value['2 Perm Charges Cost'].strip()) if value.get('2 Perm Charges Cost', '').strip() else None,
                'thirdConsumSpellCost': int(value['3 Consum Spell Cost'].strip()) if value.get('3 Consum Spell Cost', '').strip() else None,
                'thirdPermChargesCost': int(value['3 Perm Charges Cost'].strip()) if value.get('3 Perm Charges Cost', '').strip() else None
            }
        )

        print("Added: " + key)
    
    await db.disconnect()
        


if __name__ == '__main__':
    asyncio.run(add_to_db('DungeonMaster/Datasets/DatasetJSONs/EquipmentOther.json'))
