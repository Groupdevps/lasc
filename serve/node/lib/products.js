const list = [
    {"name": "ABOCAT # 18", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 1, "UserId": 1},
    {"name": "ABOCAT #20", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 1, "UserId": 1},
    {"name": "ABOCAT #22", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 1, "UserId": 1},
    {"name": "ABOCAT #24", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 1, "UserId": 1},
    {"name": "ACETAMINOFEN JARABE", "isActive": true, "units": 1, "stock": 0, "description": "150MG/5ML", "ProductTypeId": 2, "UserId": 1},
    {"name": "ACETAMINOFEN TAB", "isActive": true, "units": 1, "stock": 0, "description": "500MG", "ProductTypeId": 2, "UserId": 1},
    {"name": "ACIDO FUSIDICO TAB", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "ACIDO TRANEXAMICO AMP", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "ADRENALINA AMP", "isActive": true, "units": 1, "stock": 0, "description": "1 MG/ ML", "ProductTypeId": 2, "UserId": 1},
    {"name": "AGUJA HIPODERMICA", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 1, "UserId": 1},
    {"name": "ALBENDAZOL SUSP", "isActive": true, "units": 1, "stock": 0, "description": "100MG/5ML", "ProductTypeId": 2, "UserId": 1},
    {"name": "ALCOHOL", "isActive": true, "units": 1, "stock": 0, "description": "3800 ML", "ProductTypeId": 1, "UserId": 1},
    {"name": "ALGODÓN", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 1, "UserId": 1},
    {"name": "ALGODÓN LAMINADO  4*5", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 1, "UserId": 1},
    {"name": "ALGODÓN LAMINADO 3*5", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 1, "UserId": 1},
    {"name": "ALGODÓN LAMINADO 5*5", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 1, "UserId": 1},
    {"name": "ALGODÓN LAMINADO 6*5", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 1, "UserId": 1},
    {"name": "AMIKACINA AMP", "isActive": true, "units": 1, "stock": 0, "description": "500MG", "ProductTypeId": 2, "UserId": 1},
    {"name": "AMIODARONA 3 ML", "isActive": true, "units": 1, "stock": 0, "description": "5ML", "ProductTypeId": 2, "UserId": 1},
    {"name": "AMIODARONA TAB", "isActive": true, "units": 1, "stock": 0, "description": "500MG", "ProductTypeId": 2, "UserId": 1},
    {"name": "AMLODIPINO TAB", "isActive": true, "units": 1, "stock": 0, "description": "1.5 GR", "ProductTypeId": 2, "UserId": 1},
    {"name": "AMLODIPINO TAB", "isActive": true, "units": 1, "stock": 0, "description": "100 MG", "ProductTypeId": 2, "UserId": 1},
    {"name": "AMPICILINA AMPOLLA 1GR", "isActive": true, "units": 1, "stock": 0, "description": "100 MG", "ProductTypeId": 2, "UserId": 1},
    {"name": "AMPICILINA SULBACTAM AMP", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "ASA PEDIATRICA TAB", "isActive": true, "units": 1, "stock": 0, "description": "10 ML", "ProductTypeId": 2, "UserId": 1},
    {"name": "ATORVASTATINA TAB", "isActive": true, "units": 1, "stock": 0, "description": "20 ML", "ProductTypeId": 2, "UserId": 1},
    {"name": "ATROPINA TAB", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "BAJALENGUAS", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 1, "UserId": 1},
    {"name": "BATAS DESECHABLES", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "BECLOMETASONA INHALADOR", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "BERODUAL SOLUCION", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "BISTURI", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "BURETROL", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "CABESTRILLO BERONA TALLA S", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "CABESTRILLO TRADICIONAL TALLA L", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "CANULAS ADULTO", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "CANULAS PEDIATRICA", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "CAPTOPRIL TAB", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "CAPTOPRIL TAB", "isActive": true, "units": 1, "stock": 0, "description": "600 MG", "ProductTypeId": 2, "UserId": 1},
    {"name": "CEFALEXINA TAB", "isActive": true, "units": 1, "stock": 0, "description": "0,150 MG", "ProductTypeId": 2, "UserId": 1},
    {"name": "CEFALOCINA", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "CEFTRIAXONA AMP", "isActive": true, "units": 1, "stock": 0, "description": "120 ML", "ProductTypeId": 2, "UserId": 1},
    {"name": "CIPROFLOXACINA AMP", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "CISTOFLÓ", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "CLINDAMICINA AMP", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "CLONIDINA TAB", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "CLOPIDROGEL", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "CLORFENIRAMINA JARABE", "isActive": true, "units": 1, "stock": 0, "description": "10 ML", "ProductTypeId": 2, "UserId": 1},
    {"name": "CLORURO DE POTASIO", "isActive": true, "units": 1, "stock": 0, "description": "40 GR", "ProductTypeId": 2, "UserId": 1},
    {"name": "CLORURO DE SODIO AMP", "isActive": true, "units": 1, "stock": 0, "description": "10 ML", "ProductTypeId": 2, "UserId": 1},
    {"name": "CLOTRIMAZOL CREMA", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "COMPLEJO B AMP", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "COMPLEJO B TAB", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "COPRIDOGEL", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "CROMADO", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "CROMADO 2/0", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "CROMADO 3/0", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "CROMADO 4/0", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "DEXAMETASONA AMP", "isActive": true, "units": 1, "stock": 0, "description": "4 MG", "ProductTypeId": 1, "UserId": 1},
    {"name": "DEXAMETASONA AMP", "isActive": true, "units": 1, "stock": 0, "description": "8 MG", "ProductTypeId": 1, "UserId": 1},
    {"name": "DEXTROSA 10 %", "isActive": true, "units": 1, "stock": 0, "description": "500 ML", "ProductTypeId": 1, "UserId": 1},
    {"name": "DEXTROXA 5%", "isActive": true, "units": 1, "stock": 0, "description": "500 ML", "ProductTypeId": 2, "UserId": 1},
    {"name": "DICLOFENACO AMP", "isActive": true, "units": 1, "stock": 0, "description": "75 MG", "ProductTypeId": 2, "UserId": 1},
    {"name": "DICLOFENACO TAB", "isActive": true, "units": 1, "stock": 0, "description": "50 MG", "ProductTypeId": 2, "UserId": 1},
    {"name": "DICLOXACILINA TAB", "isActive": true, "units": 1, "stock": 0, "description": "500MG", "ProductTypeId": 2, "UserId": 1},
    {"name": "DIMENHIDRINATO TAB", "isActive": true, "units": 1, "stock": 0, "description": "500 MG", "ProductTypeId": 2, "UserId": 1},
    {"name": "DIOXODIN", "isActive": true, "units": 1, "stock": 0, "description": "50 MG", "ProductTypeId": 2, "UserId": 1},
    {"name": "DIPIRONA AMP", "isActive": true, "units": 1, "stock": 0, "description": "1 GR", "ProductTypeId": 2, "UserId": 1},
    {"name": "DOPAMINA AMP", "isActive": true, "units": 1, "stock": 0, "description": "20 MG", "ProductTypeId": 2, "UserId": 1},
    {"name": "DOPLEX", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "ELECTRODOS", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "ENALAPRIL TAB", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "EQUIPO DE ORGANO", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "EQUIPO MACRO", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "EQUIPO MICRO", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "ESPARADRAPO", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "ESPECULOS", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "ESPIRONOLACTONA TAB", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "FENITOINA AMP", "isActive": true, "units": 1, "stock": 0, "description": "250 MG", "ProductTypeId": 2, "UserId": 1},
    {"name": "FENTANILO AMP", "isActive": true, "units": 1, "stock": 0, "description": "10 ML", "ProductTypeId": 2, "UserId": 1},
    {"name": "FUROSEMIDA AMP", "isActive": true, "units": 1, "stock": 0, "description": "20 MG", "ProductTypeId": 2, "UserId": 1},
    {"name": "GASA", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "GENTAMICINA 0,3% GOTAS", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "GENTAMICINA AMP", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "GENTAMICINA AMP", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "GLUCOMETRO", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "GLUCOQUIOK AGUJAS PARA PLUMAS", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "GORROS DESECHABLESE", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "GUANTES CAJA X 100 UND", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "GUANTES ESTERILES", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "GUARDIAN", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "HARTMANN SOLUCION", "isActive": true, "units": 1, "stock": 0, "description": "500 ML", "ProductTypeId": 2, "UserId": 1},
    {"name": "HIDROCORTISONA AMP", "isActive": true, "units": 1, "stock": 0, "description": "100 MG", "ProductTypeId": 2, "UserId": 1},
    {"name": "HIDROGEL CONDUCTOR", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "HIDROXIDO DE ALUMINIO", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "HIOSCINA + DIPIRONA AMP", "isActive": true, "units": 1, "stock": 0, "description": "20 MG", "ProductTypeId": 2, "UserId": 1},
    {"name": "HIOSCINA AMP", "isActive": true, "units": 1, "stock": 0, "description": "20 MG", "ProductTypeId": 2, "UserId": 1},
    {"name": "IBUPROFENO TABLETA", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 1, "UserId": 1},
    {"name": "INHALOCAMARA ADULTO", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 1, "UserId": 1},
    {"name": "INHALOCAMARA PEDIATRICA", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "INSULINA HUMANA", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "INSULINA HUMANA ISOFANICA", "isActive": true, "units": 1, "stock": 0, "description": "10 ML", "ProductTypeId": 2, "UserId": 1},
    {"name": "IRBERSARTAN TABLETA", "isActive": true, "units": 1, "stock": 0, "description": "150ML", "ProductTypeId": 2, "UserId": 1},
    {"name": "JERINGA 1CC", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 1, "UserId": 1},
    {"name": "JERINGA 3CC", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 1, "UserId": 1},
    {"name": "JERINGA 3CC PEDIATRICA", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 1, "UserId": 1},
    {"name": "JERINGA 5CC", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 1, "UserId": 1},
    {"name": "JERINGA10CC", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 1, "UserId": 1},
    {"name": "JERINGA20CC", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 1, "UserId": 1},
    {"name": "JERINGAS DE 60ML", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 1, "UserId": 1},
    {"name": "KETOTIFENO JARABE", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "KIT MNB ADULTO", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "KIT MNB PEDIATRICO", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "KIT VENTURI ADULTO", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "KIT VENTURI PEDIATRICO", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "LABETALOL", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "LACTULOSA", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "LANCETAS", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "LANTUS INSULINA", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "LIDOCAINA JALEA", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "LIDOCAINA LIQUIDA", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "LOPERAMIDA TAB", "isActive": true, "units": 1, "stock": 0, "description": "20 MG", "ProductTypeId": 2, "UserId": 1},
    {"name": "LORATADINA TAB", "isActive": true, "units": 1, "stock": 0, "description": "2 MG", "ProductTypeId": 2, "UserId": 1},
    {"name": "LORATADINA TAB", "isActive": true, "units": 1, "stock": 0, "description": "2 MG", "ProductTypeId": 2, "UserId": 1},
    {"name": "LOSARTAN POTASICO", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "LOSARTAN TAB", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "METFORMINA", "isActive": true, "units": 1, "stock": 0, "description": "50 MG", "ProductTypeId": 2, "UserId": 1},
    {"name": "METFORMINA TAB", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "METILPREDNISOLONA AMP", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "METOCARBAMOL TAB", "isActive": true, "units": 1, "stock": 0, "description": "500 MG", "ProductTypeId": 2, "UserId": 1},
    {"name": "METOCLOPRAMIDA AMP", "isActive": true, "units": 1, "stock": 0, "description": "500ML", "ProductTypeId": 2, "UserId": 1},
    {"name": "METOCLOPRAMIDA TAB", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "METOPROLOL TAB", "isActive": true, "units": 1, "stock": 0, "description": "10 MG", "ProductTypeId": 2, "UserId": 1},
    {"name": "METRONIDAZOL AMPOLLA", "isActive": true, "units": 1, "stock": 0, "description": "10 MG", "ProductTypeId": 2, "UserId": 1},
    {"name": "METRONIDAZOL TAB", "isActive": true, "units": 1, "stock": 0, "description": "50", "ProductTypeId": 2, "UserId": 1},
    {"name": "MIDAZOLAM", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "NAPROXENO 500MG TAB", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "NAPROXENO JARABE", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "NAPROXENO TAB", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "NEBULIZADOR", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "NITROGLICERINA", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "NYLON 2/0", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "NYLON 3/0", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "NYLON 4/0", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "NYLON 5/0", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "OMEPRAZOL AMP", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "PAMOATO DE PIRANTEL SUSP", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "PANTOPRAZOL", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 1, "UserId": 1},
    {"name": "PATONOTIL GOTAS", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "PERA PARA LAVADO DE OIDO", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 1, "UserId": 1},
    {"name": "PRAZOSINA TAB", "isActive": true, "units": 1, "stock": 0, "description": "5MG", "ProductTypeId": 2, "UserId": 1},
    {"name": "PREDNISOLONA TAB", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "PULSOXIMETRO", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 1, "UserId": 1},
    {"name": "QUADRIDERM CREMA", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "ROLLO PARA ELECTRO", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 1, "UserId": 1},
    {"name": "SABANAS DESECHABLE", "isActive": true, "units": 1, "stock": 0, "description": "100 MG", "ProductTypeId": 1, "UserId": 1},
    {"name": "SALBUTAMOL INHALADOR", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "SEDA 2/0", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "SEDA 3/0", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "SEDA 4/0", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "SOLHIDREX SOL. ORAL", "isActive": true, "units": 1, "stock": 0, "description": "500 ML", "ProductTypeId": 2, "UserId": 1},
    {"name": "SOLUCION SALINA", "isActive": true, "units": 1, "stock": 0, "description": "250 ML", "ProductTypeId": 1, "UserId": 1},
    {"name": "SOLUCION SALINA", "isActive": true, "units": 1, "stock": 0, "description": "100 ML", "ProductTypeId": 1, "UserId": 1},
    {"name": "SOLUCION SALINA", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 1, "UserId": 1},
    {"name": "SONDA FOLEY 14", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "SONDA FOLEY 16", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "SONDA NELATON  #6", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "SONDA NELATON #18", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "SONDA NELATON #8", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "SONDA SUCCION #16", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "SONDAS", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "SONDAS NELATON # 10", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "SULFADIAZIDA DE PLATA CREMA", "isActive": true, "units": 1, "stock": 0, "description": "30 GR", "ProductTypeId": 2, "UserId": 1},
    {"name": "SULFATO FERROSO JARABE", "isActive": true, "units": 1, "stock": 0, "description": "120 ML", "ProductTypeId": 2, "UserId": 1},
    {"name": "SULFATO FERROSO TAB", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "TAPABOCAS", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 1, "UserId": 1},
    {"name": "TAPON VENOSO", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 1, "UserId": 1},
    {"name": "TIAMINA AMP", "isActive": true, "units": 1, "stock": 0, "description": "5ML", "ProductTypeId": 2, "UserId": 1},
    {"name": "TIAMINA TAB", "isActive": true, "units": 1, "stock": 0, "description": "0,5 ML", "ProductTypeId": 2, "UserId": 1},
    {"name": "TIRILLAS", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "TRAMADOL AMP", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "TRAMADOL AMP", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "TRIDERM CREMA", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "TRIMETOPRIM AMPOLLA", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "VACUNA ANTITETANICA AMP", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1},
    {"name": "VENDA DE ALGODÓN 3 X5", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "VENDA DE YESO 3*5", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "VENDA DE YESO 4*5", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "VENDA DE YESO 5*5", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "VENDA DE YESO 6*5", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "VENDA ELASTICA 3*5", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "VENDA ELASTICA 4*5", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "VENDA ELASTICA 5*5", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "VENDA ELASTICA 6*5", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 3, "UserId": 1},
    {"name": "VITAMINA K AMPOLLA", "isActive": true, "units": 1, "stock": 0, "description": null, "ProductTypeId": 2, "UserId": 1}
]

const products = list.map(x => {
    return {
        name: x.name.toUpperCase(),
        description: x.description ? x.description.toUpperCase() : null,
        isActive: x.isActive,
        units: x.units,
        stock: x.stock,
        ProductTypeId: x.ProductTypeId,
        UserId: x.UserId,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
});


module.exports = products;

