const crypto = require('crypto');
const moment = require('moment');


const generateUBLInvoiceXML = async(
    bill = {
    payerName : "OPTICAS GMO COLOMBIA S A S",
    
    organizationType : "1", //si es persona natural o juridica
    billExpeditionDate : "2019-06-20",
    billNumber : "SETP990000002",
    ElectronicBillingAuthorization: { //registro de autorizacion de facturacion
        authorizationNumber: "18760000001",
        StartDate: "2019-01-19",
        EndDate: "2030-01-19",
        prefix: "SETP",
        from: 990000000,
        to: 995000000
    },
    SoftwareProvider: {
        nit:  "800197268", //nit de software propio
        SoftwareID : "56f2ae4e-9812-4fad-9255-08fcfcd5ccb0", //id que da la dian
        pin: "1234", //pin lo da la dian
        dv : "4" //el dv del nit
    },
    dian: {
        nit: "800197268",

    },
    InvoiceTypeCode : "01",
    operationType : "10",
    Center: {
        nit: "800197268",
        organizationType : "1", //si es persona natural o juridica
        TaxLevelCode: "O-99", //tiene lizta de la dian
        IndustryClasificationCode : "7020", //codigo del rut
        name: "Nombre Tienda",
        Address: { //debe haber direccion y direccion legal
            City : {
                name: "",
                code: ""
            },
            State :  {
                name: "",
                code: ""
            },
            zipcode: "",
            address: "Av. #97 - 13"

        },
        TaxScheme : {
            code : "01",
            name :  "IVA"
        }
    },
    
}) => {
    const SoftwareSecurityCode = crypto.createHash('sha384').update(bill.SoftwareProvider.SoftwareID + bill.SoftwareProvider.pin ).digest('hex');
    const QRCode = `
            NroFactura=SETP990000002
            NitFacturador=800197268
            NitAdquiriente=900108281
            FechaFactura=2019-06-20
            ValorTotalFactura=14024.07
            CUFE=941cf36af62dbbc06f105d2a80e9bfe683a90e84960eae4d351cc3afbe8f848c26c39bac4fbc80fa254824c6369ea694
            URL=https://catalogo‐vpfe.dian.gov.co/document/searchqr?documentkey=941cf36af62dbbc06f105d2a80e9bfe683a90e84960eae4d351cc3afbe8f848c26c39bac4fbc80fa254824c6369ea694&amp;partitionKey=co|06|94&amp;emissionDate=20190620

        `
    const ProfileExecutionID = 2 // 1 produccion 2 pruebas
    const UUIDBill =  crypto.createHash('sha384').update("").digest('hex');
    const IssueDate = moment(billExpeditionDate).format('YYYY-MM-DD');

    const IssueTime = moment(billExpeditionDate).format('HH:mm:ss') + "-05:00";
    const StartDate = moment(bill.entryDate).format('YYYY-MM-DD');
    const EndDate = moment(bill.exitDate).format('YYYY-MM-DD');

    const LineCountNumeric = bill.Details.length
    const xmlInvoice = `<?xml version="1.0" encoding="UTF-8" standalone="no"?><Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2" xmlns:sts="dian:gov:co:facturaelectronica:Structures-2-1" xmlns:xades="http://uri.etsi.org/01903/v1.3.2#" xmlns:xades141="http://uri.etsi.org/01903/v1.4.1#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2     http://docs.oasis-open.org/ubl/os-UBL-2.1/xsd/maindoc/UBL-Invoice-2.1.xsd">
   <ext:UBLExtensions>
      <ext:UBLExtension>
         <ext:ExtensionContent>
            <sts:DianExtensions>
               <sts:InvoiceControl>
                  <sts:InvoiceAuthorization>${bill.ElectronicBillingAuthorization?.authorizationNumber}</sts:InvoiceAuthorization>
                  <sts:AuthorizationPeriod>
                     <cbc:StartDate>${bill.ElectronicBillingAuthorization?.StartDate}</cbc:StartDate>
                     <cbc:EndDate>${bill.ElectronicBillingAuthorization?.EndDate}</cbc:EndDate>
                  </sts:AuthorizationPeriod>
                  <sts:AuthorizedInvoices>
                     <sts:Prefix>${bill.ElectronicBillingAuthorization?.prefix}</sts:Prefix>
                     <sts:From>${bill.ElectronicBillingAuthorization?.from}</sts:From>
                     <sts:To>${bill.ElectronicBillingAuthorization?.to}</sts:To>
                  </sts:AuthorizedInvoices>
               </sts:InvoiceControl>
               <sts:InvoiceSource>
                  <cbc:IdentificationCode listAgencyID="6" listAgencyName="United Nations Economic Commission for Europe" listSchemeURI="urn:oasis:names:specification:ubl:codelist:gc:CountryIdentificationCode-2.1">CO</cbc:IdentificationCode>
               </sts:InvoiceSource>
               <sts:SoftwareProvider>
                  <sts:ProviderID schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)" schemeID=${bill.SoftwareProvider.dv} schemeName="31">${bill.SoftwareProvider.nit}</sts:ProviderID>
                  <sts:SoftwareID schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)">${bill.SoftwareProvider.SoftwareID}</sts:SoftwareID>
               </sts:SoftwareProvider>
               <sts:SoftwareSecurityCode schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)">${SoftwareSecurityCode}</sts:SoftwareSecurityCode>
               <sts:AuthorizationProvider>
                  <sts:AuthorizationProviderID schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)" schemeID="4" schemeName="31">800197268</sts:AuthorizationProviderID>
               </sts:AuthorizationProvider>
               <sts:QRCode>${QRCode}</sts:QRCode>
            </sts:DianExtensions>
         </ext:ExtensionContent>
      </ext:UBLExtension>
   
   <ext:UBLExtension><ext:ExtensionContent>FIRMAAQUI</ext:ExtensionContent></ext:UBLExtension></ext:UBLExtensions>
   <cbc:UBLVersionID>UBL 2.1</cbc:UBLVersionID>
   <cbc:CustomizationID>${bill.operationType}</cbc:CustomizationID>
   <cbc:ProfileID>DIAN 2.1</cbc:ProfileID>
   <cbc:ProfileExecutionID>${ProfileExecutionID}</cbc:ProfileExecutionID>
   <cbc:ID>${bill.billNumber}</cbc:ID>
   <cbc:UUID schemeID="2" schemeName="CUFE-SHA384">${UUIDBill}</cbc:UUID>
   <cbc:IssueDate>${IssueDate}</cbc:IssueDate>
   <cbc:IssueTime>${IssueTime}</cbc:IssueTime>
   <cbc:InvoiceTypeCode>${bill.InvoiceTypeCode}</cbc:InvoiceTypeCode>
   <cbc:Note>${bill.note}</cbc:Note>
   <cbc:DocumentCurrencyCode listAgencyID="6" listAgencyName="United Nations Economic Commission for Europe" listID="ISO 4217 Alpha">COP</cbc:DocumentCurrencyCode>
   <cbc:LineCountNumeric>${LineCountNumeric}</cbc:LineCountNumeric>
   <cac:InvoicePeriod>
      <cbc:StartDate>${StartDate}</cbc:StartDate>
      <cbc:EndDate>${EndDate}</cbc:EndDate>
   </cac:InvoicePeriod>
   
   <cac:AccountingSupplierParty>
      <cbc:AdditionalAccountID>${bill.Center.organizationType}</cbc:AdditionalAccountID>
      <cac:Party>
         <cbc:IndustryClasificationCode>${bill.Center.IndustryClasificationCode}</cbc:IndustryClasificationCode>
         <cac:PartyName>
            <cbc:Name>${bill.Center.name}</cbc:Name>
         </cac:PartyName>
         <cac:PhysicalLocation>
            <cac:Address>
               <cbc:ID>${bill.Center.Address.City.code}</cbc:ID>
               <cbc:CityName>${bill.Center.Address.City.name}</cbc:CityName>
               <cbc:PostalZone>${bill.Center.Address.zipcode}</cbc:PostalZone>
               <cbc:CountrySubentity>${bill.Center.Address.State.name}</cbc:CountrySubentity>
               <cbc:CountrySubentityCode>${bill.Center.Address.State.code}</cbc:CountrySubentityCode>
               <cac:AddressLine>
                  <cbc:Line>${bill.Center.Address.address}</cbc:Line>
               </cac:AddressLine>
               <cac:Country>
                  <cbc:IdentificationCode>CO</cbc:IdentificationCode>
                  <cbc:Name languageID="es">Colombia</cbc:Name>
               </cac:Country>
            </cac:Address>
         </cac:PhysicalLocation>
         <cac:PartyTaxScheme>
            <cbc:RegistrationName>${bill.Center.legalName}</cbc:RegistrationName>
            <cbc:CompanyID schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)" schemeID=${bill.Center.dv} schemeName="31">${bill.Center.nit}</cbc:CompanyID>
            <cbc:TaxLevelCode listName="05">${bill.Center.TaxLevelCode}</cbc:TaxLevelCode>
            <cac:RegistrationAddress>
               <cbc:ID>${bill.Center.Address.City.code}</cbc:ID>
               <cbc:CityName>${bill.Center.Address.City.name}</cbc:CityName>
               <cbc:PostalZone>${bill.Center.Address.zipcode}</cbc:PostalZone>
               <cbc:CountrySubentity>${bill.Center.Address.State.name}</cbc:CountrySubentity>
               <cbc:CountrySubentityCode>${bill.Center.Address.State.code}</cbc:CountrySubentityCode>
               <cac:AddressLine>
                  <cbc:Line>${bill.Center.Address.address}</cbc:Line>
               </cac:AddressLine>
               <cac:Country>
                  <cbc:IdentificationCode>CO</cbc:IdentificationCode>
                  <cbc:Name languageID="es">Colombia</cbc:Name>
               </cac:Country>
            </cac:RegistrationAddress>
            <cac:TaxScheme>
               <cbc:ID>${bill.Center.TaxScheme.code}</cbc:ID>
               <cbc:Name>${bill.Center.TaxScheme.code}</cbc:Name>
            </cac:TaxScheme>
         </cac:PartyTaxScheme>
         <cac:PartyLegalEntity>
            <cbc:RegistrationName>${bill.Center.legalName}</cbc:RegistrationName>
            <cbc:CompanyID schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)" schemeID=${bill.Center.dv} schemeName="31">${bill.Center.nit}</cbc:CompanyID>
            <!-- <cac:CorporateRegistrationScheme>
               <cbc:ID>${bill.ElectronicBillingAuthorization.prefix}</cbc:ID>
               <cbc:Name>10181</cbc:Name> 
            </cac:CorporateRegistrationScheme> -->
         </cac:PartyLegalEntity>
         <!-- <cac:Contact>
            <cbc:Name>Eric Valencia</cbc:Name>
            <cbc:Telephone>6111111</cbc:Telephone>
            <cbc:ElectronicMail>eric.valencia@ket.co</cbc:ElectronicMail>
            <cbc:Note>Test descripcion contacto</cbc:Note>
         </cac:Contact> -->
      </cac:Party>
   </cac:AccountingSupplierParty>
   <cac:AccountingCustomerParty>
      <cbc:AdditionalAccountID>${bill.organizationType}</cbc:AdditionalAccountID>
      <cac:Party>
         <cac:PartyName>
            <cbc:Name>${bill.payerName}</cbc:Name>
         </cac:PartyName>
         <cac:PhysicalLocation>
            <cac:Address>
               <cbc:ID>11001</cbc:ID>
               <cbc:CityName>Bogotá, D.c. </cbc:CityName>
               <cbc:CountrySubentity>Bogotá</cbc:CountrySubentity>
               <cbc:CountrySubentityCode>11</cbc:CountrySubentityCode>
               <cac:AddressLine>
                  <cbc:Line>CARRERA 8 No 20-14/40</cbc:Line>
               </cac:AddressLine>
               <cac:Country>
                  <cbc:IdentificationCode>CO</cbc:IdentificationCode>
                  <cbc:Name languageID="es">Colombia</cbc:Name>
               </cac:Country>
            </cac:Address>
         </cac:PhysicalLocation>
         <cac:PartyTaxScheme>
            <cbc:RegistrationName>OPTICAS GMO COLOMBIA S A S</cbc:RegistrationName>
            <cbc:CompanyID schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)" schemeID="3" schemeName="31">900108281</cbc:CompanyID>
            <cbc:TaxLevelCode listName="04">O-99</cbc:TaxLevelCode>
            <cac:RegistrationAddress>
               <cbc:ID>11001</cbc:ID>
               <cbc:CityName>Bogotá, D.c. </cbc:CityName>
               <cbc:CountrySubentity>Bogotá</cbc:CountrySubentity>
               <cbc:CountrySubentityCode>11</cbc:CountrySubentityCode>
               <cac:AddressLine>
                  <cbc:Line>CR 9 A N0 99 - 07 OF 802</cbc:Line>
               </cac:AddressLine>
               <cac:Country>
                  <cbc:IdentificationCode>CO</cbc:IdentificationCode>
                  <cbc:Name languageID="es">Colombia</cbc:Name>
               </cac:Country>
            </cac:RegistrationAddress>
            <cac:TaxScheme>
               <cbc:ID>01</cbc:ID>
               <cbc:Name>IVA</cbc:Name>
            </cac:TaxScheme>
         </cac:PartyTaxScheme>
         <cac:PartyLegalEntity>
            <cbc:RegistrationName>OPTICAS GMO COLOMBIA S A S</cbc:RegistrationName>
            <cbc:CompanyID schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)" schemeID="3" schemeName="31">900108281</cbc:CompanyID>
            <cac:CorporateRegistrationScheme>
               <cbc:Name>90518</cbc:Name>
            </cac:CorporateRegistrationScheme>
         </cac:PartyLegalEntity>
         <cac:Contact>
            <cbc:Name>Diana Cruz</cbc:Name>
            <cbc:Telephone>31031031089</cbc:Telephone>
            <cbc:ElectronicMail>dcruz@empresa.org</cbc:ElectronicMail>
         </cac:Contact>
      </cac:Party>
   </cac:AccountingCustomerParty>
   <cac:TaxRepresentativeParty>
      <cac:PartyIdentification>
         <cbc:ID schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)" schemeID="4" schemeName="31">989123123</cbc:ID>
      </cac:PartyIdentification>
   </cac:TaxRepresentativeParty>
   <cac:Delivery>
      <cac:DeliveryAddress>
         <cbc:ID>11001</cbc:ID>
         <cbc:CityName>Bogotá, D.c. </cbc:CityName>
         <cbc:CountrySubentity>Bogotá, D.c. 11</cbc:CountrySubentity>
         <cbc:CountrySubentityCode>11</cbc:CountrySubentityCode>
         <cac:AddressLine>
            <cbc:Line>CARRERA 8 No 20-14/40</cbc:Line>
         </cac:AddressLine>
         <cac:Country>
            <cbc:IdentificationCode>CO</cbc:IdentificationCode>
            <cbc:Name languageID="es">Colombia</cbc:Name>
         </cac:Country>
      </cac:DeliveryAddress>
      <cac:DeliveryParty>
         <cac:PartyName>
            <cbc:Name>Empresa de transporte</cbc:Name>
         </cac:PartyName>
         <cac:PhysicalLocation>
            <cac:Address>
               <cbc:ID>11001</cbc:ID>
               <cbc:CityName>Bogotá, D.c. </cbc:CityName>
               <cbc:CountrySubentity>Bogotá</cbc:CountrySubentity>
               <cbc:CountrySubentityCode>11</cbc:CountrySubentityCode>
               <cac:AddressLine>
                  <cbc:Line>Av.  #17 - 193</cbc:Line>
               </cac:AddressLine>
               <cac:Country>
                  <cbc:IdentificationCode>CO</cbc:IdentificationCode>
                  <cbc:Name languageID="es">Colombia</cbc:Name>
               </cac:Country>
            </cac:Address>
         </cac:PhysicalLocation>
         <cac:PartyTaxScheme>
            <cbc:RegistrationName>Empresa de transporte</cbc:RegistrationName>
            <cbc:CompanyID schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)" schemeID="1" schemeName="31">981223983</cbc:CompanyID>
            <cbc:TaxLevelCode listName="04">O-99</cbc:TaxLevelCode>
            <cac:TaxScheme>
               <cbc:ID>01</cbc:ID>
               <cbc:Name>IVA</cbc:Name>
            </cac:TaxScheme>
         </cac:PartyTaxScheme>
         <cac:PartyLegalEntity>
            <cbc:RegistrationName>Empresa de transporte</cbc:RegistrationName>
            <cbc:CompanyID schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)" schemeID="1" schemeName="31">981223983</cbc:CompanyID>
            <cac:CorporateRegistrationScheme>
               <cbc:Name>75433</cbc:Name>
            </cac:CorporateRegistrationScheme>
         </cac:PartyLegalEntity>
         <cac:Contact>
            <cbc:Name>Eric Van Boxsom</cbc:Name>
            <cbc:Telephone>9712311</cbc:Telephone>
            <cbc:Telefax>12431241</cbc:Telefax>
            <cbc:ElectronicMail>eric.vanboxsom@gosocket.net</cbc:ElectronicMail>
            <cbc:Note>Test descripcion contacto</cbc:Note>
         </cac:Contact>
      </cac:DeliveryParty>
   </cac:Delivery>
   <cac:DeliveryTerms>
      <cbc:SpecialTerms>Portes Pagados</cbc:SpecialTerms>
      <cbc:LossRiskResponsibilityCode>CFR</cbc:LossRiskResponsibilityCode>
      <cbc:LossRisk>Costo y Flete</cbc:LossRisk>
   </cac:DeliveryTerms>
   <cac:PaymentMeans>
      <cbc:ID>2</cbc:ID>
      <cbc:PaymentMeansCode>41</cbc:PaymentMeansCode>
      <cbc:PaymentDueDate>2019-06-30</cbc:PaymentDueDate>
      <cbc:PaymentID>1234</cbc:PaymentID>
   </cac:PaymentMeans>
   <cac:PrepaidPayment>
      <cbc:ID>SFR3123856</cbc:ID>
      <cbc:PaidAmount currencyID="COP">1000.00</cbc:PaidAmount>
      <cbc:ReceivedDate>2018-09-29</cbc:ReceivedDate>
      <cbc:PaidDate>2018-09-29</cbc:PaidDate>
      <cbc:InstructionID>Prepago recibido</cbc:InstructionID>
   </cac:PrepaidPayment>
   <cac:TaxTotal>
      <cbc:TaxAmount currencyID="COP">2424.01</cbc:TaxAmount>
      <cac:TaxSubtotal>
         <cbc:TaxableAmount currencyID="COP">12600.06</cbc:TaxableAmount>
         <cbc:TaxAmount currencyID="COP">2394.01</cbc:TaxAmount>
         <cac:TaxCategory>
            <cbc:Percent>19.00</cbc:Percent>
            <cac:TaxScheme>
               <cbc:ID>01</cbc:ID>
               <cbc:Name>IVA</cbc:Name>
            </cac:TaxScheme>
         </cac:TaxCategory>
      </cac:TaxSubtotal>
      <cac:TaxSubtotal>
         <cbc:TaxableAmount currencyID="COP">187.50</cbc:TaxableAmount>
         <cbc:TaxAmount currencyID="COP">30.00</cbc:TaxAmount>
         <cac:TaxCategory>
            <cbc:Percent>16.00</cbc:Percent>
            <cac:TaxScheme>
               <cbc:ID>01</cbc:ID>
               <cbc:Name>IVA</cbc:Name>
            </cac:TaxScheme>
         </cac:TaxCategory>
      </cac:TaxSubtotal>
   </cac:TaxTotal>
   <cac:TaxTotal>
      <cbc:TaxAmount currencyID="COP">0.00</cbc:TaxAmount>
      <cac:TaxSubtotal>
         <cbc:TaxableAmount currencyID="COP">0.00</cbc:TaxableAmount>
         <cbc:TaxAmount currencyID="COP">0.00</cbc:TaxAmount>
         <cac:TaxCategory>
            <cbc:Percent>0.000</cbc:Percent>
            <cac:TaxScheme>
               <cbc:ID>03</cbc:ID>
               <cbc:Name>ICA</cbc:Name>
            </cac:TaxScheme>
         </cac:TaxCategory>
      </cac:TaxSubtotal>
   </cac:TaxTotal>
   <cac:TaxTotal>
      <cbc:TaxAmount currencyID="COP">0.00</cbc:TaxAmount>
      <cac:TaxSubtotal>
         <cbc:TaxableAmount currencyID="COP">0.00</cbc:TaxableAmount>
         <cbc:TaxAmount currencyID="COP">0.00</cbc:TaxAmount>
         <cac:TaxCategory>
            <cbc:Percent>0.00</cbc:Percent>
            <cac:TaxScheme>
               <cbc:ID>04</cbc:ID>
               <cbc:Name>INC</cbc:Name>
            </cac:TaxScheme>
         </cac:TaxCategory>
      </cac:TaxSubtotal>
   </cac:TaxTotal>
   <cac:LegalMonetaryTotal>
      <cbc:LineExtensionAmount currencyID="COP">12600.06</cbc:LineExtensionAmount>
      <cbc:TaxExclusiveAmount currencyID="COP">12787.56</cbc:TaxExclusiveAmount>
      <cbc:TaxInclusiveAmount currencyID="COP">15024.07</cbc:TaxInclusiveAmount>
      <cbc:PrepaidAmount currencyID="COP">1000.00</cbc:PrepaidAmount>
      <cbc:PayableAmount currencyID="COP">14024.07</cbc:PayableAmount>
   </cac:LegalMonetaryTotal>
   <cac:InvoiceLine>
      <cbc:ID>1</cbc:ID>
      <cbc:InvoicedQuantity unitCode="EA">1.000000</cbc:InvoicedQuantity>
      <cbc:LineExtensionAmount currencyID="COP">12600.06</cbc:LineExtensionAmount>
      <cbc:FreeOfChargeIndicator>false</cbc:FreeOfChargeIndicator>
      <cac:Delivery>
         <cac:DeliveryLocation>
            <cbc:ID schemeID="999" schemeName="EAN">613124312412</cbc:ID>
         </cac:DeliveryLocation>
      </cac:Delivery>
      <cac:AllowanceCharge>
         <cbc:ID>1</cbc:ID>
         <cbc:ChargeIndicator>false</cbc:ChargeIndicator>
         <cbc:AllowanceChargeReason>Descuento por cliente frecuente</cbc:AllowanceChargeReason>
         <cbc:MultiplierFactorNumeric>33.33</cbc:MultiplierFactorNumeric>
         <cbc:Amount currencyID="COP">6299.94</cbc:Amount>
         <cbc:BaseAmount currencyID="COP">18900.00</cbc:BaseAmount>
      </cac:AllowanceCharge>
      <cac:TaxTotal>
         <cbc:TaxAmount currencyID="COP">2394.01</cbc:TaxAmount>
         <cac:TaxSubtotal>
            <cbc:TaxableAmount currencyID="COP">12600.06</cbc:TaxableAmount>
            <cbc:TaxAmount currencyID="COP">2394.01</cbc:TaxAmount>
            <cac:TaxCategory>
               <cbc:Percent>19.00</cbc:Percent>
               <cac:TaxScheme>
                  <cbc:ID>01</cbc:ID>
                  <cbc:Name>IVA</cbc:Name>
               </cac:TaxScheme>
            </cac:TaxCategory>
         </cac:TaxSubtotal>
      </cac:TaxTotal>
      <cac:Item>
         <cbc:Description>AV OASYS -2.25 (8.4) LENTE DE CONTATO</cbc:Description>
         <cac:SellersItemIdentification>
            <cbc:ID>AOHV84-225</cbc:ID>
         </cac:SellersItemIdentification>
         <cac:AdditionalItemIdentification>
            <cbc:ID schemeID="999" schemeName="EAN13">6543542313534</cbc:ID>
         </cac:AdditionalItemIdentification>
      </cac:Item>
      <cac:Price>
         <cbc:PriceAmount currencyID="COP">18900.00</cbc:PriceAmount>
         <cbc:BaseQuantity unitCode="EA">1.000000</cbc:BaseQuantity>
      </cac:Price>
   </cac:InvoiceLine>
   <cac:InvoiceLine>
      <cbc:ID>2</cbc:ID>
      <cbc:InvoicedQuantity unitCode="NIU">1.000000</cbc:InvoicedQuantity>
      <cbc:LineExtensionAmount currencyID="COP">0.00</cbc:LineExtensionAmount>
      <cbc:FreeOfChargeIndicator>true</cbc:FreeOfChargeIndicator>
      <cac:DocumentReference>
         <cbc:ID>TST1543623</cbc:ID>
         <cbc:IssueDate>2019-03-02</cbc:IssueDate>
         <cbc:DocumentTypeCode>1001-A</cbc:DocumentTypeCode>
         <cbc:DocumentType>Bienes Propios</cbc:DocumentType>
      </cac:DocumentReference>
      <cac:DocumentReference>
         <cbc:ID>GR8713461</cbc:ID>
         <cbc:IssueDate>2019-03-02</cbc:IssueDate>
         <cbc:DocumentTypeCode>AR</cbc:DocumentTypeCode>
      </cac:DocumentReference>
      <cac:PricingReference>
         <cac:AlternativeConditionPrice>
            <cbc:PriceAmount currencyID="COP">100.00</cbc:PriceAmount>
            <cbc:PriceTypeCode>03</cbc:PriceTypeCode>
            <cbc:PriceType>Otro valor</cbc:PriceType>
         </cac:AlternativeConditionPrice>
      </cac:PricingReference>
      <cac:Delivery>
         <cac:DeliveryLocation>
            <cbc:ID schemeID="999" schemeName="EAN">613124312412</cbc:ID>
         </cac:DeliveryLocation>
      </cac:Delivery>
      <cac:TaxTotal>
         <cbc:TaxAmount currencyID="COP">30.00</cbc:TaxAmount>
         <cac:TaxSubtotal>
            <cbc:TaxableAmount currencyID="COP">187.50</cbc:TaxableAmount>
            <cbc:TaxAmount currencyID="COP">30.00</cbc:TaxAmount>
            <cac:TaxCategory>
               <cbc:Percent>16.00</cbc:Percent>
               <cac:TaxScheme>
                  <cbc:ID>01</cbc:ID>
                  <cbc:Name>IVA</cbc:Name>
               </cac:TaxScheme>
            </cac:TaxCategory>
         </cac:TaxSubtotal>
      </cac:TaxTotal>
      <cac:Item>
         <cbc:Description>Bolsa</cbc:Description>
         <cac:SellersItemIdentification>
            <cbc:ID>91412012412</cbc:ID>
         </cac:SellersItemIdentification>
         <cac:StandardItemIdentification>
            <cbc:ID schemeAgencyID="10" schemeID="001" schemeName="UNSPSC">18937100-7</cbc:ID>
         </cac:StandardItemIdentification>
      </cac:Item>
      <cac:Price>
         <cbc:PriceAmount currencyID="COP">0.00</cbc:PriceAmount>
         <cbc:BaseQuantity unitCode="NIU">1.000000</cbc:BaseQuantity>
      </cac:Price>
   </cac:InvoiceLine>
</Invoice>`;
  
    return xmlInvoice
}

module.exports = generateUBLInvoiceXML