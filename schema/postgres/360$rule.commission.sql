CREATE TABLE rule.commission(
  "commissionId" serial NOT NULL,
  "conditionId" integer NOT NULL,

  "startAmount" money NOT NULL,
  "startAmountCurrency" char(3) NOT NULL,
  "isSourceAmount" boolean NOT NULL,

  "minValue" money,
  "maxValue" money,
  "percent" float,
  "percentBase" float,

  CONSTRAINT "pkRuleCommission" PRIMARY KEY ("commissionId"),
  CONSTRAINT "fkRuleCommission_condition" FOREIGN KEY ("conditionId") REFERENCES rule.condition ("conditionId") MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
)
