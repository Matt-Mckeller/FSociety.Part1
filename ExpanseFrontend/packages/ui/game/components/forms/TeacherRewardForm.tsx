"use client"

import React, { useState, useCallback, useContext, useMemo } from "react"
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  SelectChangeEvent,
  Chip,
  OutlinedInput,
  ListItemText,
  Typography,
} from "@mui/material"
import { useMutation } from "@apollo/client"
import { ManageRewaradsDictionary } from "../../config/Dictionary"
import { CREATE_REWARD } from "../../gql/rewards"
import {
  REWARD_POINT_OPTIONS_LIST,
  REWARD_POINT_OPTIONS_MAP,
  RewardInterface,
  TeacherClassification,
} from "../../types"
import { getApolloClient, LayoutContext } from "expanse.ui/application"
import { getApolloClientEdu } from "../../../application/context/Api.context"

interface TeacherRewardFormProps {
  reward?: RewardInterface<TeacherClassification> // Replace with appropriate type
  onSuccess?: () => void
  taughtClasses: { elId: string; name: string }[]
  loadingTaughtClasses: boolean
}

export const TeacherRewardForm: React.FC<TeacherRewardFormProps> = ({
  reward,
  onSuccess,
  taughtClasses,
  loadingTaughtClasses,
}) => {
  const [name, setName] = useState(reward?.name || "")
  const [description, setDescription] = useState(reward?.description || "")
  const [cost, setCost] = useState(reward?.cost || "")
  const [selectedClasses, setSelectedClasses] = useState<string[]>([])
  const [allClassesSelected, setAllClassesSelected] = useState(false)
  const [limitMaxPurchase, setLimitMaxPurchase] = useState(
    reward?.rewardConfiguration?.maxPurchaseQuantity &&
      reward?.rewardConfiguration?.maxPurchaseQuantity > 0
      ? true
      : false,
  )
  const [maxPurchaseQuantity, setMaxPurchaseQuantity] = useState(
    reward?.rewardConfiguration?.maxPurchaseQuantity || 0,
  )
  const [submitting, setSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  //   const {showSnackbarSuccess, showSnackbarError} = useSnackbar()
  const { showSnackbarSuccess, showSnackbarError } = useContext(LayoutContext)

  const apolloClient = useMemo(() => getApolloClientEdu(), [])
  const [createReward, { loading }] = useMutation(CREATE_REWARD, {
    client: apolloClient,
  })

  const clearForm = useCallback(() => {
    return // disabled for testing
    setName("")
    setDescription("")
    setCost("")
    setLimitMaxPurchase(false)
    setMaxPurchaseQuantity(0)
    setSelectedClasses([])
  }, [])
  const handleSave = useCallback(async () => {
    setSubmitting(true)
    setFormErrors({})

    // Validate form
    const errors: { [key: string]: string } = {}
    if (!selectedClasses.length)
      errors.selectedClasses = "Select at least one class"
    if (!name) errors.name = "Name is required"
    if (!cost) errors.cost = "Cost is required"
    if (limitMaxPurchase && maxPurchaseQuantity <= 0)
      errors.maxPurchaseQuantity =
        "Max Purchase Quantity must be greater than 0"

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      setSubmitting(false)
      return
    }

    // Prepare data for GraphQL request
    const rewardData = {
      name,
      description,
      category: "teacher",
      variant: "deafult",
      cost,
      limitMaxPurchase: limitMaxPurchase,
      //   limitMaxPurchase: limitMaxPurchase ? 1 : 0,
      maxPurchaseQuantity: limitMaxPurchase ? maxPurchaseQuantity : null,
      elClassIds: selectedClasses,
    }

    try {
      await createReward({ variables: { reward: rewardData } })
      showSnackbarSuccess("Reward saved successfully!")
      clearForm()
      if (onSuccess) onSuccess()
      // Handle success (e.g., show a success message, reset form, etc.)
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.log("error", error)
      showSnackbarError("Error saving reward!")
      // todo handle error
    } finally {
      setSubmitting(false)
    }
  }, [
    name,
    description,
    cost,
    limitMaxPurchase,
    maxPurchaseQuantity,
    createReward,
  ])

  const handleSelectClassesChange = (
    event: SelectChangeEvent<typeof selectedClasses>,
  ) => {
    const {
      target: { value },
    } = event
    const valueArray = typeof value === "string" ? value.split(",") : value

    if (valueArray.includes("all")) {
      if (allClassesSelected) {
        setSelectedClasses([])
        setAllClassesSelected(false)
      } else {
        const allClassIds = taughtClasses.map((cls) => cls.elId)
        setSelectedClasses(allClassIds)
        setAllClassesSelected(true)
      }
    } else {
      setSelectedClasses(valueArray)
      setAllClassesSelected(valueArray.length === taughtClasses.length)
    }
  }

  return (
    <Box component="form" display="flex" flexDirection="column" gap={2}>
      <InputLabel id="multiclass-select">
        Which classes can redeem this reward?
      </InputLabel>

      <Select
        labelId="multiclass-select"
        placeholder="Select Multiple Classes"
        displayEmpty={true}
        value={selectedClasses}
        onChange={handleSelectClassesChange}
        multiple={true}
        error={!!formErrors.selectedClasses}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return (
              <Box display="flex">
                {loadingTaughtClasses && <CircularProgress size={24} />}
                <Typography ml={2}>Eligible Classes</Typography>
              </Box>
            )
          }
          return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={
                    taughtClasses.find(({ elId }) => elId === value)?.name ||
                    "Unknown"
                  }
                />
              ))}
            </Box>
          )
        }}
        disabled={submitting}
      >
        <MenuItem key={"allClassesSelected"} value={"all"}>
          <Checkbox checked={allClassesSelected} />
          <ListItemText primary={"All Classes"} />
        </MenuItem>
        {taughtClasses.map((cls) => (
          <MenuItem key={cls.elId} value={cls.elId}>
            <Checkbox checked={selectedClasses.includes(cls.elId)} />
            <ListItemText primary={cls.name} />
          </MenuItem>
        ))}
      </Select>
      <TextField
        label={ManageRewaradsDictionary.en.name}
        placeholder={ManageRewaradsDictionary.en.namePlaceholder}
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={!!formErrors.name}
        helperText={formErrors.name}
        disabled={submitting}
        required
      />
      <TextField
        label={ManageRewaradsDictionary.en.description}
        placeholder={ManageRewaradsDictionary.en.descriptionPlaceholder}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={!!formErrors.description}
        helperText={formErrors.description}
        disabled={submitting}
      />
      <TextField
        select
        label={ManageRewaradsDictionary.en.cost}
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        error={!!formErrors.cost}
        helperText={formErrors.cost}
        disabled={submitting}
        required
      >
        {REWARD_POINT_OPTIONS_LIST.slice(
          0,
          REWARD_POINT_OPTIONS_LIST.length - 1,
        ).map((optionValue) => (
          <MenuItem key={optionValue} value={optionValue}>
            {optionValue} Points ( {REWARD_POINT_OPTIONS_MAP[optionValue]} coins
            )
          </MenuItem>
        ))}
      </TextField>
      <Box display="flex" alignItems="center">
        <Checkbox
          checked={limitMaxPurchase}
          onChange={(e) => setLimitMaxPurchase(e.target.checked)}
          disabled={submitting}
        />
        <TextField
          label={ManageRewaradsDictionary.en.maxPurchaseQuantity}
          placeholder={
            ManageRewaradsDictionary.en.maxPurchaseQuantityPlaceholder
          }
          type="number"
          value={maxPurchaseQuantity}
          onChange={(e) => setMaxPurchaseQuantity(Number(e.target.value))}
          error={!!formErrors.maxPurchaseQuantity}
          helperText={formErrors.maxPurchaseQuantity}
          disabled={!limitMaxPurchase || submitting}
          sx={{ minWidth: "100px" }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        disabled={submitting}
      >
        {submitting ? <CircularProgress size={24} /> : "Save"}
      </Button>
    </Box>
  )
}
