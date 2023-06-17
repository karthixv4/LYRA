import React from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { updateName,setCuisine,updateDescription,saveRecipe,updateCookingSteps,updateDietRestriction } from '../../slices/RecipeSlice';
import { useUserAuth } from '../auth/UserAuthContext';
import { getAllCuisines } from '../../slices/CuisineSlice';
import { getAllRecipes } from '../../slices/RecipeSlice';
import { useNavigate } from 'react-router-dom';

const steps = ['Recipe About', 'Ingredients', 'Cooking Steps'];

const AddingRecipe = () => {
    const dispatch = useDispatch();
    var recipe = useSelector((state) => state.recipes.recipe);
    var cuisines = useSelector((state) => state.cuisines.cuisines);
    const [activeStep, setActiveStep] = React.useState(0);
    const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
  
    useEffect(() => {
        dispatch(getAllRecipes())
        dispatch(getAllCuisines())
      }, []);
    
    
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    //Step-1
    const handleCuisineChange =(id)=>{
        const cuisine = {
          id: id,
          cuisines: cuisines
        }
       dispatch(setCuisine(cuisine))
      }
      const [selectedFile, setSelectedFile] = useState(null);
      const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
      }
    const step1 =()=>{
        return (
            <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                id="outlined-error"
                label="Recipe Name"
                onChange={(e=>dispatch(updateName(e.target.value)))}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ minWidth: 180 }}>
                <InputLabel id="demo-simple-select-label">Cuisine Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Cuisine Type"
                  value={recipe.cuisine.name || ''}
                  onChange={(e) => handleCuisineChange(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {cuisines.map((cuisine, index) => (
                    <MenuItem key={index} value={cuisine.name}>{cuisine.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                label="Description"
                multiline
                rows={4}
                placeholder="Introduce your recipe, add notes, cooking tips, serving suggestions, etc..."
                variant="outlined"
                fullWidth
                onChange={(e) => dispatch(updateDescription(e.target.value))}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ position: 'relative' }}>
                <label htmlFor="image" style={{ lineHeight: '1.5', fontSize: '0.875rem', color: '#6B7280' }}>
                  Image
                </label>
                <TextField
                  type="file"
                  id="image"
                  name="image"
                  variant="outlined"
                  fullWidth
                  onChange={handleFileSelect}
                  sx={{
                    '& .MuiInputBase-root': {
                      background: 'rgba(0, 0, 0, 0.04)',
                      borderRadius: '4px',
                      border: '1px solid #CBD5E0',
                      '&:hover': {
                        borderColor: '#6B7280',
                      },
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        )
    }
    //Step-2
    const step2 =()=>{
        return( 
        
<>
  {ingredients.map((ingredient, index) => (
    <Box mb={2} key={index}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Ingredients"
            variant="outlined"
            value={ingredient.name}
            onChange={(event) => handleInputChange(index, event, 'name')}
            placeholder="Name your Ingredient"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Quantity"
            variant="outlined"
            value={ingredient.quantity}
            onChange={(event) => handleInputChange(index, event, 'quantity')}
            placeholder="Quantity"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          {index !== 0 && (
            <IconButton onClick={() => handleRemoveFields(index)}>
              <RemoveIcon />
            </IconButton>
          )}
          {index === ingredients.length - 1 && (
            <IconButton onClick={handleAddFields}>
              <AddIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Box>
  ))}
</>
        )
    }

    //step-3
    const step3=()=>{
        return (
            <Grid container spacing={2}>
  <Grid item xs={12}>
    <TextField
      onChange={(e)=>dispatch(updateDietRestriction(e.target.value))}
      id="outlined-error"
      label="Diet-Restriction"
      fullWidth
    />
  </Grid>
  <Grid item xs={12}>
    <TextField
      id="Cooking Steps"
      label="Cooking Steps"
      multiline
      rows={4}
      placeholder="Introduce your recipe, add notes, cooking tips, serving suggestions, etc..."
      variant="outlined"
      fullWidth
      onChange={(e) => dispatch(updateCookingSteps(e.target.value))}
    />
  </Grid>
</Grid>
        )
    }

    //Submit
    const {user} = useUserAuth();
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        recipe = { ...recipe,
                ingredient: ingredients,
                userDetails: {
                  name: user.displayName,
                  email: user.email
                }
          }
        
          const newRecipe={
            recipe:recipe,
            file:selectedFile
          }
         console.log("Recipe Details: ",newRecipe)
         dispatch(saveRecipe(newRecipe))
         navigate("/home")
      };
      const handleInputChange = (index, event, field) => {
        const { value } = event.target;
        const updatedIngredients = [...ingredients];
        updatedIngredients[index][field] = value;
        setIngredients(updatedIngredients);
      };
    
      function handleAddFields() {
        const values = [...ingredients];
        values.push({ name: "", quantity: "" });
        setIngredients(values);
      }
    
      function handleRemoveFields(index) {
        const values = [...ingredients];
        values.splice(index, 1);
        setIngredients(values);
      }
  
    const handleReset = () => {
      setActiveStep(0);
    };
  
    return (
        <>
        <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Add a Recipe</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
           Write a Blog, Better about Food!
          </p>
          {/* <p className="mt-6 text-lg leading-8 text-gray-600">
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
            pulvinar et feugiat blandit at. In mi viverra elit nunc.
          </p> */}
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <form onSubmit={handleSubmit}>
        <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
           
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button type="submit">Submit</Button>
              <Button onClick={handleReset} >Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            {activeStep === 0 && step1()}
            {activeStep === 1 && step2()}
            {activeStep === 2 && step3()}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              
              <Button onClick={handleNext} 
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
      </form>
        </div>
      </div>
    </div>
      
      </>
    );
  }

export default AddingRecipe